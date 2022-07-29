import { CronJob } from 'cron';
import { getAccountPosts, getPostComments } from '../apis/facebook';
import DatumBoxAPICall from '../middlewares/datumBox/datumBox';
import FacebookApi from '../models/facebook/api';
import FacebookComment from '../models/facebook/comment';
import FacebookPost from '../models/facebook/post';

/**
 * Updates the database as follows:
 *    1. Gets all Facebook account IDs stored in the db
 *    2. For each Facebook account:
 *        a. Fetches all posts created on the previous day.
 *        b. Gets all the posts stored in the db that are
 *           related to this Facebook account, and for each one
 *           fetches and updates the comments.
 */
export async function startPipeline(firstTime = false) {
  try {
    /* Get stored Facebook Accounts (API) */
    let facebookApis = await FacebookApi.findAll();
    if (facebookApis.length == 0) return;

    /* Get boundary dates */
    const initial = new Date();
    const daysToFetch = firstTime ? 7 : 1;
    initial.setDate(initial.getDate() - daysToFetch);
    const today = new Date();
    const dates = [
      Math.round(initial.getTime() / 1000),
      Math.round(today.getTime() / 1000),
    ];

    /* Update data for each FB account */
    facebookApis.forEach(async (api) => {
      /* Get IG account data */
      const accessToken = api.token;
      const apiId = api.id;

      /* Fetch and update posts */
      await updateAccountPost(accessToken, apiId, dates);

      /* Fetch and update comments */
      const post = await FacebookPost.findAll({
        where: { apiId: api.id },
      });
      if (post.length == 0) return;
      post.forEach(async (post) => {
        await updatePostComments(accessToken, post);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Uses the Facebook Graph API to fetch and store information related
 * to posts belonging to the provided Facebook account
 * @param {string} accessToken The access token of the Facebook App
 * @param {number} apiId The id of the FacebookApi object that's linked to the post
 * @param {number[]} dates The date range to fetch data from in seconds
 */
async function updateAccountPost(
  accessToken: string,
  apiId: number,
  dates: number[]
) {
  /* Perform request */
  const data: any[] = await getAccountPosts(accessToken, dates[0], dates[1]);
  if (data === null) return;

  /* Update data in db */
  data.forEach(async (post: { [key: string]: any }) => {
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
    FacebookPost.findOne({
      where: { dataId: post['id'] },
    }).then(function (obj) {
      if (obj) {
        obj.update({
          likes: reactions['LIKE'],
          loves: reactions['LOVE'],
          cares: reactions['CARE'],
          hahas: reactions['HAHA'],
          wows: reactions['WOW'],
          sads: reactions['SAD'],
          angrys: reactions['ANGRY'],
        });
      } else {
        FacebookPost.create({
          dataId: post['id'],
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
        });
      }
    });
  });
}

/**
 * Uses the Facebook Graph API to fetch and store information related
 * to the comments belonging to the provided post
 * @param {string} accessToken The access token of the Facebook App
 * @param {number} post The FacebookPost object that's linked to the comments
 */
async function updatePostComments(accessToken: string, post: FacebookPost) {
  /* Perform request */
  const data: any[] = await getPostComments(accessToken, post.dataId);
  if (data === null) return;

  /* Update data in db */
  data.forEach(async (comment: { [key: string]: any }) => {
    FacebookComment.findOne({
      where: { dataId: comment['id'] },
    }).then(async function (obj) {
      let message = comment['message'];
      let textAnalysis = await DatumBoxAPICall(message);

      if (obj) {
        obj.update({
          likes: Number(comment['like_count']),
          message,
          sentimentAnalysis: textAnalysis.SentimentAnalysis,
          subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
          topicClassification: textAnalysis.TopicClassification,
        });
      } else {
        FacebookPost.create({
          dataId: comment['id'],
          date: comment['created_time'],
          userName: comment['from']['name'],
          likes: Number(comment['like_count']),
          postId: post.id,
          message,
          sentimentAnalysis: textAnalysis.SentimentAnalysis,
          subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
          topicClassification: textAnalysis.TopicClassification,
        });
      }
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
