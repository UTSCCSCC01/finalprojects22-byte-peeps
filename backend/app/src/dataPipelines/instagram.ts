import { CronJob } from 'cron';
import fetch from 'node-fetch';
import FacebookApi from '../models/facebook/api';
import InstagramApi from '../models/instagram/api';
import InstagramComment from '../models/instagram/comment';
import InstagramMedia from '../models/instagram/media';
import InstagramTag from '../models/instagram/tag';

const InstagramGraphApiUrl = 'https://graph.facebook.com';

/**
 * Updates the database as follows:
 *    1. Gets all Instagram account IDs stored in the db
 *    2. For each Instagram account:
 *        a. Fetches all media posted on the previous day.
 *        b. Fetches all tags posted on the previous day.
 *        c. Gets all the media related to this Instagram
 *           account stored in the db, and for each one
 *           fetches the comments posted the previous day.
 */
export async function startPipeline() {
  let instagramApis = await InstagramApi.findAll({ include: FacebookApi });
  if (instagramApis.length == 0) return;

  instagramApis.forEach(async (api) => {
    /* Get IG account data */
    const instagramAccountId = api.nodeId;
    const accessToken = api.facebookApi.token;
    const apiId = api.id;

    /* Fetch and update data */
    updateAccountMedia(instagramAccountId, accessToken, apiId);

    /* Fetch and update tags */
    updateAccountTags(instagramAccountId, accessToken);

    /* Fetch and update comments */
    const media = await InstagramMedia.findAll({
      where: { apiId: api.id },
    });
    if (media.length == 0) return;
    media.forEach((media) => {
      updateAccountComments(media.dataId, accessToken, media.id);
    });
  });
}

/**
 * Uses the Instagram Graph API to fetch and store information related
 * to all media belonging to the Instagram accounts stored in the db
 */
async function updateAccountMedia(
  instagramAccountId: string,
  accessToken: string,
  apiId: number
) {
  /* Build URL */
  const InstagramMediaUrl =
  InstagramGraphApiUrl +
  `/${instagramAccountId}/media` +
  `?access_token=${accessToken}` +
  '&fields=id,timestamp,caption,like_count,comments_count,comments';
  
  /* Perform request */
  const response: any = await fetch(
    InstagramMediaUrl
  );
  const data = await response.json()
  if (data['data'].length == 0) return;

  /* Update data in db */
  data['data'].forEach(async (media: { [key: string]: any }) => {
    const mediaObj = await InstagramMedia.findOne({ where: { dataId: media['id'] } });

    if (mediaObj === null) {
      InstagramMedia.create({
        dataId: media['id'],
        date: media['timestamp'],
        caption: media['caption'],
        likes: Number(media['like_count']),
        numComments: Number(media['comments_count']),
        apiId: apiId,
      });
    }
  });
}

/**
 * Uses the Instagram Graph API to fetch and store information related
 * to all tags belonging to the Instagram accounts stored in the db
 */
async function updateAccountTags(
  instagramAccountId: string,
  accessToken: string
) {
  /* Build URL */
  const InstagramTagsUrl =
    InstagramGraphApiUrl +
    `/${instagramAccountId}/tags` +
    `?access_token=${accessToken}` +
    '&fields=id,timestamp,username,caption,like_count,comments_count';

  /* Perform request */
  const response: any = await fetch(
    InstagramTagsUrl
  );
  const data = await response.json();
  if (data['data'].length == 0) return;

  /* Update data in db */
  data['data'].forEach(async (tag: { [key: string]: any }) => {
    const tagObj = await InstagramTag.findOne({ where: { dataId: tag['id'] } });

    if (tagObj === null) {
      InstagramTag.create({
        datatId: tag['id'],
        date: tag['timestamp'],
        username: tag['username'],
        caption: tag['caption'],
        likes: Number(tag['like_count']),
        numComments: Number(tag['comments_count']),
      });
    }
  });
}

/**
 * Uses the Instagram Graph API to fetch and store information related
 * to all comments under each media (post) stored in the db
 */
async function updateAccountComments(mediaId: string, accessToken: string, mediaObjId: number) {
  /* Build URL */
  const InstagramCommentsUrl =
    InstagramGraphApiUrl +
    `/${mediaId}/comments` +
    `?access_token=${accessToken}` +
    '&fields=id,username,text,timestamp,like_count';

  /* Perform request */
  const response: any = await fetch(
    InstagramCommentsUrl
  );
  const data = await response.json();
  if (data['data'].length == 0) return;

  /* Update data in db */
  data['data'].forEach(async (comment: { [key: string]: any }) => {
    const commentObj = await InstagramComment.findOne({
      where: { dataId: comment['id'] },
    });

    if (commentObj === null) {
      InstagramComment.create({
        dataId: comment['id'],
        date: comment['timestamp'],
        userName: comment['username'],
        message: comment['text'],
        likes: Number(comment['like_count']),
        mediaId: mediaObjId,
      });
    }
  });
}

export const instagramScheduledJob = new CronJob(
  '0 0 * * *', // Daily
  startPipeline,
  null,
  false,
  'America/Toronto'
);
