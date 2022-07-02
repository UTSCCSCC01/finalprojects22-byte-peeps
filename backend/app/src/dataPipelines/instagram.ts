import { CronJob } from 'cron';
import fetch from 'node-fetch';
import FacebookApi from '../models/facebook/api';
import InstagramApi from '../models/instagram/api';
import InstagramMedia from '../models/instagram/media';
import InstagramTag from '../models/instagram/tag';
import InstagramComment from '../models/instagram/comment';

const InstagramGraphApiUrl = 'https://graph.facebook.com';

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
export async function startPipeline() {
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
    const instagramAccountId = api.nodeId;
    const accessToken = api.facebookApi.token;
    const apiId = api.id;

    /* Fetch and update media */
    updateAccountMedia(instagramAccountId, accessToken, apiId, dates);

    /* Fetch and update tags */
    updateAccountTags(instagramAccountId, accessToken, apiId, dates);

    /* Fetch and update comments */
    const media = await InstagramMedia.findAll({
      where: { apiId: api.id },
    });
    if (media.length == 0) return;
    media.forEach((media) => {
      updateMediaComments(media.dataId, accessToken, media.id, dates);
    });
  });
}

/**
 * Uses the Instagram Graph API to fetch and store information related
 * to media (posts) belonging to the provided Instagram account
 * @param {string} instagramAccountId The Instagram account ID
 * @param {string} accessToken The access token of the Facebook App
 * @param {number} apiId The id of the InstagramApi object that will be linked
 * @param {number[]} dates The date range to fetch data from in seconds
 */
async function updateAccountMedia(
  instagramAccountId: string,
  accessToken: string,
  apiId: number,
  dates: number[]
) {
  /* Build URL */
  const InstagramMediaUrl =
    InstagramGraphApiUrl +
    `/${instagramAccountId}/media` +
    `?access_token=${accessToken}` +
    '&fields=id,timestamp,caption,like_count,comments_count' +
    `&since=${dates[0]}&until=${dates[1]}`;

  /* Perform request */
  const response: any = await fetch(InstagramMediaUrl);
  const data = await response.json();
  if (data['data'] === undefined || data['data'].length == 0) return;

  /* Update data in db */
  data['data'].forEach(async (media: { [key: string]: any }) => {
    InstagramMedia.findOrCreate({
      where: { dataId: media['id'] },
      defaults: {
        date: media['timestamp'],
        caption: media['caption'],
        likes: Number(media['like_count']),
        numComments: Number(media['comments_count']),
        apiId: apiId,
      },
    });
  });
}

/**
 * Uses the Instagram Graph API to fetch and store information related
 * to tags belonging to the provided Instagram account
 * @param {string} instagramAccountId The Instagram account ID
 * @param {string} accessToken The access token of the Facebook App
 * @param {number} apiId The id of the InstagramApi object that will be linked
 * @param {number[]} dates The date range to fetch data from in seconds
 */
async function updateAccountTags(
  instagramAccountId: string,
  accessToken: string,
  apiId: number,
  dates: number[]
) {
  /* Build URL */
  const InstagramTagsUrl =
    InstagramGraphApiUrl +
    `/${instagramAccountId}/tags` +
    `?access_token=${accessToken}` +
    '&fields=id,timestamp,username,caption,like_count,comments_count';

  /* Perform request */
  const response: any = await fetch(InstagramTagsUrl);
  const data = await response.json();
  if (data['data'] === undefined || data['data'].length == 0) return;

  /* Update data in db */
  data['data'].forEach(async (tag: { [key: string]: any }) => {
    InstagramTag.findOrCreate({
      where: { dataId: tag['id'] },
      defaults: {
        date: tag['timestamp'],
        username: tag['username'],
        caption: tag['caption'],
        likes: Number(tag['like_count']),
        numComments: Number(tag['comments_count']),
        apiId: apiId,
      },
    });
  });
}

/**
 * Uses the Instagram Graph API to fetch and store information related
 * to the comments belonging to the provided media (post)
 * @param {string} mediaId The id given by Instagram to the media
 * @param {string} accessToken The access token of the Facebook App
 * @param {number} mediaObjId The id of the media object in the db
 * @param {number[]} dates The date range to fetch data from in seconds
 */
async function updateMediaComments(
  mediaId: string,
  accessToken: string,
  mediaObjId: number,
  dates: number[]
) {
  /* Build URL */
  const InstagramCommentsUrl =
    InstagramGraphApiUrl +
    `/${mediaId}/comments` +
    `?access_token=${accessToken}` +
    '&fields=id,username,text,timestamp,like_count';

  /* Perform request */
  const response: any = await fetch(InstagramCommentsUrl);
  const data = await response.json();
  if (data['data'] === undefined || data['data'].length == 0) return;

  /* Update data in db */
  data['data'].forEach(async (comment: { [key: string]: any }) => {
    InstagramComment.findOrCreate({
      where: { dataId: comment['id'] },
      defaults: {
        date: comment['timestamp'],
        userName: comment['username'],
        message: comment['text'],
        likes: Number(comment['like_count']),
        mediaId: mediaObjId,
      },
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
