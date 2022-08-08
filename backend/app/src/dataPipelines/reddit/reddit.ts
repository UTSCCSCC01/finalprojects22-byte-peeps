import { updateListings } from './redditlisting';
import { CronJob } from 'cron';
import fetch from 'node-fetch';
import Subreddit from '../../models/reddit/subreddit';
import RedditListing from '../../models/reddit/listing';
import RedditComment from '../../models/reddit/comment';
import DatumBoxAPICall from '../../middlewares/datumBox/datumBox';
import { updateComment } from './redditComment'
const RedditBaseUrl = 'https://www.reddit.com';
/**
 * Updates the database as follows:
 *    1. Gets all subreddit names stored in the db
 *    2. For each subreddit:
 *        a. Fetches all todays' listings.
 *        b. Gets all the listings stored in the db that are
 *           under this subreddit, and for each one
 *           fetches and updates the comments.
 */

export async function startPipeline(firstTime = false) {
  try {
    /* Get stored subreddits*/
    let subreddit = await Subreddit.findOne();

    if (subreddit === null) return;



    /* Fetch and update listings */
    await updateListings(subreddit, firstTime);


  } catch (err) {
    console.error(err);
  }

  try {
    /* Get stored reddit listings*/
    let listings = await RedditListing.findAll();
    if (listings.length == 0) return;

    /* Update comment for each listing */
    await Promise.all(listings.map(async (listing) => {
      await updateComment(listing);
    }))

  } catch (err) {
    console.error(err);
  }
}



/**
 * Cron Job to run the Reddit update script on a daily basis
 */
export const redditScheduledJob = new CronJob(
  '0 0 * * *', // Daily
  startPipeline,
  null,
  false,
  'America/Toronto'
);
