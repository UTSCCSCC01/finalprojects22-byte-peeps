import { CronJob } from 'cron';
import {
  getAccountMedia,
  getAccountTags,
  getMediaComments,
} from '../apis/instagram';
import DatumBoxAPICall from '../middlewares/datumBox/datumBox';
import FacebookApi from '../models/facebook/api';
import InstagramApi from '../models/instagram/api';
import InstagramComment from '../models/instagram/comment';
import InstagramMedia from '../models/instagram/media';
import InstagramTag from '../models/instagram/tag';

/**
 * Updates the database as follows:
 *    1. Gets all Instagram account IDs stored in the db
 *    2. For each Instagram account:
 *        a. Fetches all media posted on the previous day.
 *        b. Fetches all tags.
 *        c. Gets all the media stored in the db that are
 *           related to this Instagram account, and for each one
 *           fetches and updates the comments.
 */
async function startPipeline() {
  try {
    /* Get stored Instagram Accounts (API) */
    let instagramApis = await InstagramApi.findAll({ include: FacebookApi });
    if (instagramApis.length == 0) return;

    /* Get boundary dates */
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const today = new Date();
    const dates = [
      Math.round(yesterday.getTime() / 1000),
      Math.round(today.getTime() / 1000),
    ];

    /* Update data for each IG account */
    instagramApis.forEach(async (api) => {
      /* Get IG account data */
      const accessToken = api.facebookApi.token;

      /* Fetch and update media */
      await updateAccountMedia(accessToken, api, dates);

      /* Fetch and update tags */
      await updateAccountTags(accessToken, api);

      /* Fetch and update comments */
      const media = await InstagramMedia.findAll({
        where: { apiId: api.id },
      });
      if (media.length == 0) return;
      media.forEach(async (media) => {
        await updateMediaComments(accessToken, media);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Uses the Instagram Graph API to fetch and store information related
 * to media (posts) belonging to the provided Instagram account
 * @param {string} accessToken The access token of the Facebook App
 * @param {InstagramApi} api The InstagramApi object that's linked to the media
 * @param {number[]} dates The date range to fetch data from in seconds
 */
async function updateAccountMedia(
  accessToken: string,
  api: InstagramApi,
  dates: number[]
) {
  /* Perform request */
  const data: any[] = await getAccountMedia(
    accessToken,
    api.nodeId,
    dates[0],
    dates[1]
  );
  if (data === null) return;

  /* Update data in db */
  data.forEach(async (media: { [key: string]: any }) => {
    InstagramMedia.findOne({
      where: { dataId: media['id'] },
    }).then(function (obj) {
      if (obj) {
        obj.update({
          likes: Number(media['like_count']),
          numComments: Number(media['comments_count']),
        });
      } else {
        InstagramMedia.create({
          dataId: media['id'],
          date: media['timestamp'],
          caption: media['caption'],
          likes: Number(media['like_count']),
          numComments: Number(media['comments_count']),
          apiId: api.id,
        });
      }
    });
  });
}

/**
 * Uses the Instagram Graph API to fetch and store information related
 * to tags belonging to the provided Instagram account
 * @param {string} accessToken The access token of the Facebook App
 * @param {InstagramApi} api The InstagramApi object that's linked to the media
 */
async function updateAccountTags(accessToken: string, api: InstagramApi) {
  /* Perform request */
  const data: any[] = await getAccountTags(accessToken, api.nodeId);
  if (data === null) return;

  /* Update data in db */
  data.forEach(async (tag: { [key: string]: any }) => {
    InstagramTag.findOne({
      where: { dataId: tag['id'] },
    }).then(async function (obj) {
      let caption: string = tag['caption'];
      let textAnalysis = await DatumBoxAPICall(caption);

      if (obj) {
        obj.update({
          likes: Number(tag['like_count']),
          numComments: Number(tag['comments_count']),
          caption,
          sentimentAnalysis: textAnalysis.SentimentAnalysis,
          subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
          topicClassification: textAnalysis.TopicClassification,
        });
      } else {
        InstagramTag.create({
          dataId: tag['id'],
          date: tag['timestamp'],
          username: tag['username'],
          caption,
          likes: Number(tag['like_count']),
          numComments: Number(tag['comments_count']),
          sentimentAnalysis: textAnalysis.SentimentAnalysis,
          subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
          topicClassification: textAnalysis.TopicClassification,
          apiId: api.id,
        });
      }
    });
  });
}

/**
 * Uses the Instagram Graph API to fetch and store information related
 * to the comments belonging to the provided media (post)
 * @param {string} accessToken The access token of the Facebook App
 * @param {InstagramMedia} media The InstagramMedia object that's linked to the comments
 */
async function updateMediaComments(accessToken: string, media: InstagramMedia) {
  /* Perform request */
  const data: any[] = await getMediaComments(accessToken, media.dataId);
  if (data === null) return;

  /* Update data in db */
  data.forEach(async (comment: { [key: string]: any }) => {
    InstagramComment.findOne({
      where: { dataId: comment['id'] },
    }).then(async function (obj) {
      let message = comment['text'];
      let textAnalysis = await DatumBoxAPICall(message);

      if (obj) {
        obj.update({ likes: Number(comment['like_count']) });
      } else {
        InstagramComment.create({
          dataId: comment['id'],
          date: comment['timestamp'],
          userName: comment['username'],
          message,
          likes: Number(comment['like_count']),
          mediaId: media.id,
          sentimentAnalysis: textAnalysis.SentimentAnalysis,
          subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
          topicClassification: textAnalysis.TopicClassification,
        });
      }
    });
  });
}

/**
 * Cron Job to run the Instagram update script on a daily basis
 */
export const instagramScheduledJob = new CronJob(
  '0 0 * * *', // Daily
  startPipeline,
  null,
  false,
  'America/Toronto'
);
