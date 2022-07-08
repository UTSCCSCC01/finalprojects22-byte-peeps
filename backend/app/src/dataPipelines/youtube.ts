import { google } from 'googleapis';
import { CronJob } from 'cron';
import YouTubeChannel from '../models/youtube/channel';
import YouTubeVideo from '../models/youtube/video';
import YouTubeComment from '../models/youtube/comment';
import DatumBoxAPICall from '../middlewares/datumBox/datumBox';
import { DatumAPICallResult } from '../middlewares/datumBox/datumBoxTypes';

const YouTubeApiEndPoint = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

/**
 * YouTube datapipeline to update all comments, videos and channels
 * @summary Flow:
 * 1. Update all videos resource id's
 * 2. Update all videos statistics
 * 3. Update all comments
 * @returns {Promise<void>} - Promise that resolves when the function is complete
 */
async function startPipeline(): Promise<void> {
  try {
    let youtubeChannels = await YouTubeChannel.findAll();
    if (youtubeChannels.length == 0) return;

    /* Get the last day that a You dates */
    const updateVideosWorkFlow: Promise<[YouTubeVideo, boolean | null]>[] = [];

    // for looop over youtube channel and do the same thing as below
    for (let i = 0; i < youtubeChannels.length; i++) {
      const youtubeChannel = youtubeChannels[i];

      /* Get channel id */
      const channelIdKey = youtubeChannel.id;
      const channelId = youtubeChannel.channelId;
      const oauth = youtubeChannel.oauth;

      /* Last day that a YouTube video was published */
      let lastDate: Date = await YouTubeVideo.findOne({
        where: { channelId: channelIdKey },
        order: [['date', 'DESC']],
      }).then((video) => {
        if (video) return video.date;
        return new Date(0);
      });

      updateVideosWorkFlow.push(
        ...(await updateVideos(channelId, channelIdKey, oauth, lastDate))
      );
    }

    await Promise.all(updateVideosWorkFlow);

    const updateVideoStatisticsWorkFlow: Promise<void>[] = [];

    youtubeChannels.forEach(async (api) => {
      /* Get channel id */
      const channelIdKey = api.id;
      const oauth = api.oauth;

      updateVideoStatisticsWorkFlow.push(
        updateVideoStatistics(channelIdKey, oauth)
      );
    });

    await Promise.all(updateVideoStatisticsWorkFlow);
  } catch (err) {
    console.error(err);
  }
}
/**
 * Updates the each video's resource id
 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
 * @param {string} channelId - Current channelId of the YouTube channel
 * @param {number} channelIdKey - Current primary key in our db of the YouTube channel
 * @param {string} oauth - string oauth token for the YouTube API for the current channel
 * @param {Date} lastDate - Last day that a YouTube video was published for this channel
 * @return {Promise<void>} - Promise that resolves when the function is complete
 */
async function updateVideos(
  channelId: string,
  channelIdKey: number,
  oauth: string,
  lastDate: Date
): Promise<Promise<[YouTubeVideo, boolean | null]>[]> {
  let nextPage: string | undefined | null = 'init';
  const updateVideosQueries: Promise<[YouTubeVideo, boolean | null]>[] = [];

  while (nextPage) {
    const { data } = await YouTubeApiEndPoint.search.list({
      part: ['snippet'],
      channelId: channelId,
      maxResults: 50,
      type: ['video'],
      order: 'date',
      publishedAfter: lastDate.toISOString(),
    });

    if (!data.items) break;

    for (let i = 0; i < data.items.length; i++) {
      const video = data.items[i];
      let date = video.snippet?.publishedAt;
      let title = video.snippet?.title;
      let videoId = video.id?.videoId;

      const query = YouTubeVideo.upsert({
        resourceId: videoId,
        title,
        date,
        channelId: channelIdKey,
      });

      updateVideosQueries.push(query);
    }

    nextPage = data.nextPageToken;
  }

  return updateVideosQueries;
}

/**
 * @param {number} channelIdKey - Current primary key in our db of the YouTube channel
 * @param {string} oauth - string oauth token for the YouTube API for the current channel
 * @return {Promise<void>} - Promise that resolves when the function is complete
 */
async function updateVideoStatistics(
  channelIdKey: number,
  oauth: string
): Promise<void> {
  const channelVideoIds = await YouTubeVideo.findAll({
    where: { channelId: channelIdKey },
    attributes: ['id', 'resourceId'],
  });

  const videoStatisticsWorkFlow: Promise<void>[] = [];
  const videoStatisticsDbWorkFlow: Promise<[affectedCount: number]>[] = [];
  const videoCommentsDbWorkFlow: Promise<[YouTubeComment, boolean | null]>[] =
    [];

  for (let i = 0; i < channelVideoIds.length; i += 50) {
    const videoIds = channelVideoIds
      .slice(i, i + 50)
      .map((video) => video.resourceId);

    const videoStatistics = YouTubeApiEndPoint.videos
      .list({
        part: ['statistics'],
        id: videoIds,
        maxResults: 50,
      })
      .then(({ data }) => {
        data.items?.forEach((item) => {
          let stats = item.statistics;

          let dbVideoUpdateQuery = YouTubeVideo.update(
            {
              views: stats?.viewCount ? parseInt(stats.viewCount) : 0,
              likes: stats?.likeCount ? parseInt(stats.likeCount) : 0,
            },
            {
              where: { resourceId: item.id },
            }
          );

          videoStatisticsDbWorkFlow.push(dbVideoUpdateQuery);
        });
      });

    videoStatisticsWorkFlow.push(videoStatistics);
  }

  channelVideoIds.forEach(async (video) => {
    const videoId = video.resourceId;
    const videoIdKey = video.id;
    videoCommentsDbWorkFlow.push(
      ...(await updateComments(videoId, videoIdKey, oauth))
    );
  });

  await Promise.all(videoStatisticsWorkFlow);
  await Promise.all(videoStatisticsDbWorkFlow);
  await Promise.all(videoCommentsDbWorkFlow);
  return;
}
/**
 * Brief description of the function here.
 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
 * @param {string} videoId - Current videoId (resourceId) of the YouTube video
 * @param {number} videoIdKey - Current videoId primary key in our db
 * @param {string} oauth - string oauth token for the YouTube API for the current channel
 * @return {Promise<void>} - Promise that resolves when the function is complete
 */
async function updateComments(
  videoId: string,
  videoIdKey: number,
  oauth: string
): Promise<Promise<[YouTubeComment, boolean | null]>[]> {
  let nextPage: string | undefined | null = 'init';
  const dbCommentUpdateQueries: Promise<[YouTubeComment, boolean | null]>[] =
    [];

  while (nextPage) {
    const { data } = await YouTubeApiEndPoint.commentThreads.list({
      part: ['snippet'],
      videoId: videoId,
      maxResults: 100,
    });

    if (!data.items) break;

    // Must be done in an await within loop due DatumBox API rate limitations
    // otherwise we will hit the rate limit
    for (let i = 0; i < data.items.length; i++) {
      let item = data.items[i];
      let topLevelComment = item.snippet?.topLevelComment;
      let commentId = topLevelComment?.id;
      let authorDisplayName = topLevelComment?.snippet?.authorDisplayName;
      let commentMessage = topLevelComment?.snippet?.textDisplay;
      let commentLikes = topLevelComment?.snippet?.likeCount;
      let date = topLevelComment?.snippet?.publishedAt;

      if (!commentMessage) continue;

      let textAnalysis: DatumAPICallResult = await DatumBoxAPICall(
        commentMessage
      );

      let dbCommentUpdateQuery = YouTubeComment.upsert({
        resourceId: commentId,
        date: date,
        userName: authorDisplayName,
        message: commentMessage,
        likes: commentLikes,
        videoId: videoIdKey,
        sentimentAnalysis: textAnalysis.SentimentAnalysis,
        subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
        topicClassification: textAnalysis.TopicClassification,
      });

      dbCommentUpdateQueries.push(dbCommentUpdateQuery);
    }

    nextPage = data.nextPageToken;
  }

  return dbCommentUpdateQueries;
}

export const youtubeScheduledJob = new CronJob(
  '0 0 * * *', // Daily
  startPipeline,
  null,
  false,
  'America/Toronto'
);
