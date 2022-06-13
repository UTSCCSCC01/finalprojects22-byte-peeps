import { CronJob } from 'cron';
import fetch from 'node-fetch';
import FacebookApi from '../models/facebook/api';
import FacebookPost from '../models/facebook/post';
import FacebookComment from '../models/facebook/comment';

const FacebookGraphApiUrl = 'https://graph.facebook.com';

/**
 * Updates the database as follows:
 *    1. Gets all Facebook account IDs stored in the db
 *    2. For each Facebook account:
 *        a. Fetches all posts created on the previous day.
 *        b. Gets all the posts stored in the db that are
 *           related to this Facebook account, and for each one
 *           fetches and updates the comments.
 */
export async function startPipeline() {
  /* Get stored Facebook Accounts (API) */
  let facebookApis = await FacebookApi.findAll();
  if (facebookApis.length == 0) return;

  /* Get boundary dates */
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 5000);
  const today = new Date();
  const dates = [
    Math.round(yesterday.getTime() / 1000),
    Math.round(today.getTime() / 1000),
  ];

  /* Update data for each FB account */
  facebookApis.forEach(async (api) => {
    /* Get IG account data */
    const accessToken = api.token;
    const apiId = api.id;

    /* Fetch and update posts */
    updateAccountPost(accessToken, apiId, dates);

    /* Fetch and update comments */
    const post = await FacebookPost.findAll({
      where: { apiId: api.id },
    });
    if (post.length == 0) return;
    post.forEach((post) => {
      updatePostComments(post.dataId, accessToken, post.id, dates);
    });
  });
}

/**
 * Uses the Facebook Graph API to fetch and store information related
 * to posts belonging to the provided Facebook account
 * @param {string} accessToken The access token of the Facebook App
 * @param {number} apiId The id of the FacebookApi object that will be linked
 * @param {number[]} dates The date range to fetch data from in seconds
 */
async function updateAccountPost(
  accessToken: string,
  apiId: number,
  dates: number[]
) {
  /* Build URL */
  const FacebookPostsUrl =
    FacebookGraphApiUrl +
    `/me/posts` +
    `?access_token=${accessToken}` +
    '&fields=id,created_time,message,reactions' +
    `&since=${dates[0]}&until=${dates[1]}`;

  /* Perform request */
  const response: any = await fetch(FacebookPostsUrl);
  const data = await response.json();
  if (data['data'] === undefined || data['data'].length == 0) return;

  /* Update data in db */
  data['data'].forEach(async (post: { [key: string]: any }) => {
    const reactions: { [key: string]: number } = {
      LIKE: 0,
      LOVE: 0,
      CARE: 0,
      HAHA: 0,
      WOW: 0,
      SAD: 0,
      ANGRY: 0,
    };
    post['reactions']['data'].forEach((reaction: any) => {
      reactions[reaction['type']] += 1;
    });
    FacebookPost.findOrCreate({
      where: { dataId: post['id'] },
      defaults: {
        date: post['created_time'],
        message: post['message'],
        likes: reactions['LIKE'],
        loves: reactions['LOVE'],
        cares: reactions['CARE'],
        hahas: reactions['HAHA'],
        wows: reactions['WOW'],
        sads: reactions['SAD'],
        angrys: reactions['ANGRY'],
        apiId: apiId,
      },
    });
  });
}

/**
 * Uses the Facebook Graph API to fetch and store information related
 * to the comments belonging to the provided post
 * @param {string} postId The id given by Facebook to the post
 * @param {string} accessToken The access token of the Facebook App
 * @param {number} postObjId The id of the post object in the db
 * @param {number[]} dates The date range to fetch data from in seconds
 */
async function updatePostComments(
  postId: string,
  accessToken: string,
  postObjId: number,
  dates: number[]
) {
  /* Build URL */
  const FacebookCommentsUrl =
    FacebookGraphApiUrl +
    `/${postId}/comments` +
    `?access_token=${accessToken}` +
    '&fields=id,created_time,from,message,like_count';

  /* Perform request */
  const response: any = await fetch(FacebookCommentsUrl);
  const data = await response.json();
  if (data['data'] === undefined || data['data'].length == 0) return;

  /* Update data in db */
  data['data'].forEach(async (comment: { [key: string]: any }) => {
    FacebookComment.findOrCreate({
      where: { dataId: comment['id'] },
      defaults: {
        date: comment['created_time'],
        userName: comment['from']['name'],
        message: comment['message'],
        likes: Number(comment['like_count']),
        postId: postObjId,
      },
    });
  });
}

/**
 * Cron Job to run the Facebook update script on a daily basis
 */
export const facebookScheduledJob = new CronJob(
  '0 0 * * *', // Daily
  startPipeline,
  null,
  false,
  'America/Toronto'
);
