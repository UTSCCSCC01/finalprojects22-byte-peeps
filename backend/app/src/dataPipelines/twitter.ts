import { CronJob } from 'cron';
import { getTweetConversation, getUserTweets } from '../apis/twitter';
import TwitterUser from '../models/twitter/user';
import TwitterTweet from '../models/twitter/tweet';
import TwitterConversation from '../models/twitter/conversation';

/**
 * Updates the database as follows:
 *    1. Gets all Twitter users stored in the db
 *    2. For each Twitter user:
 *        a. Fetches all tweets created on the previous day.
 *        b. Gets all the tweets stored in the db that are
 *           related to this Twitter User, and for each one
 *           fetches and updates the conversation.
 */
export async function startPipeline(firstTime = false) {
  try {
    /* Get stored Twitter Users */
    let twitterUsers = await TwitterUser.findAll();
    if (twitterUsers.length == 0) return;

    /* Get boundary dates */
    const initial = new Date();
    const daysToFetch = firstTime ? 7 : 1;
    initial.setDate(initial.getDate() - daysToFetch);
    const today = new Date();
    const dates: string[] = [initial.toISOString(), today.toISOString()];

    /* Update data for each Twitter user */
    twitterUsers.forEach(async (twitterUser) => {
      /* Fetch and update posts */
      await updateUserTweets(twitterUser, dates);

      /* Fetch and update conversations */
      const tweets = await TwitterTweet.findAll({
        where: { twitterUserId: twitterUser.id },
      });
      if (tweets.length == 0) return;
      tweets.forEach(async (tweet) => {
        await updateTweetConversation(tweet);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Uses the Twitter API to fetch and store information related
 * to tweets belonging to the provided Twitter User
 * @param {TwitterUser} twitterUser The TwitterUser object that's linked to the tweet
 * @param {string[]} dates The date range to fetch data from
 */
async function updateUserTweets(twitterUser: TwitterUser, dates: string[]) {
  /* Perform request */
  const data: any[] = await getUserTweets(
    twitterUser.twitterId,
    dates[0],
    dates[1]
  );
  if (data === null) return;

  /* Update data in db */
  data.forEach(async (tweet: { [key: string]: any }) => {
    TwitterTweet.findOne({
      where: { twitterId: tweet['id'] },
    }).then(function (obj) {
      if (obj) {
        obj.update({
          retweets: tweet['public_metrics']['retweet_count'],
          replies: tweet['public_metrics']['reply_count'],
          likes: tweet['public_metrics']['like_count'],
        });
      } else {
        TwitterTweet.create({
          twitterId: tweet['id'],
          conversationId: tweet['conversation_id'],
          text: tweet['text'],
          date: tweet['created_at'],
          retweets: tweet['public_metrics']['retweet_count'],
          replies: tweet['public_metrics']['reply_count'],
          likes: tweet['public_metrics']['like_count'],
          twitterUserId: twitterUser.id,
        });
      }
    });
  });
}

/**
 * Uses the Twitter API to fetch and store information related
 * to the conversation belonging to the provided tweet
 * @param {TwitterTweet} tweet The TwitterTweet object that's linked to the conversation
 */
async function updateTweetConversation(tweet: TwitterTweet) {
  /* Perform request */
  const data: any[] = await getTweetConversation(tweet.conversationId);
  if (data === null) return;

  /* Update data in db */
  data.forEach(async (comment: { [key: string]: any }) => {
    TwitterConversation.findOne({
      where: { twitterId: comment['id'] },
    }).then(function (obj) {
      if (obj) {
        obj.update({
          retweets: comment['public_metrics']['retweet_count'],
          replies: comment['public_metrics']['reply_count'],
          likes: comment['public_metrics']['like_count'],
        });
      } else {
        TwitterConversation.create({
          twitterId: comment['id'],
          conversationId: comment['conversation_id'],
          text: comment['text'],
          date: comment['created_at'],
          retweets: comment['public_metrics']['retweet_count'],
          replies: comment['public_metrics']['reply_count'],
          likes: comment['public_metrics']['like_count'],
          tweetId: tweet.id,
        });
      }
    });
  });
}

/**
 * Cron Job to run the Twitter update script on a daily basis
 */
export const twitterScheduledJob = new CronJob(
  '0 0 * * *', // Daily
  startPipeline,
  null,
  false,
  'America/Toronto'
);
