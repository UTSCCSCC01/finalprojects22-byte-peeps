import { CronJob } from 'cron';
import fetch from 'node-fetch';
import Subreddit from '../models/reddit/subreddit';
import RedditListing from '../models/reddit/listing';
import RedditComment from '../models/reddit/comment';

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

async function startPipeline() {
  try {
    /* Get stored subreddits*/
    let subreddits = await Subreddit.findAll();
    if (subreddits.length == 0) return;

    /* Update data for each subreddit */
    subreddits.forEach(async (subreddit) => {
      /* Fetch and update listings */
      await updateListings(subreddit);
    });
  } catch (err) {
    console.error(err);
  }

  try {
    /* Get stored reddit listings*/
    let redditListings = await RedditListing.findAll();
    if (redditListings.length == 0) return;

    /* Update comment for each listing */
    redditListings.forEach(async (listing) => {
      await updateComment(listing);
    });
  } catch (err) {
    console.error(err);
  }
}
/**
 * Uses the reddit url to fetch and store information related
 * to Reddit listings belonging to a particular Subreddit
 * @param {subreddit} the Subreddit object
 */
const updateListings = async (subreddit: Subreddit) => {
  let listingsUrl =
    RedditBaseUrl + '/r/' + subreddit.name + '/top.json?t=day&raw_json=1';
  /* Perform request */
  try {
    let response = await fetch(listingsUrl);
    let data = await response.json();
    if (data['data'] === undefined || data['data'].length == 0) return;

    data['data']['children'].forEach(
      async (element: { [key: string]: any }) => {
        const listing = element['data'];
        let response = await fetch(listingsUrl);
        let data = await response.json();
        if (data['data'] === undefined || data['data'].length == 0) return;

        data['data']['children'].forEach(
          async (element: { [key: string]: any }) => {
            const listing = element['data'];

            try {
              await RedditListing.findOrCreate({
                where: {
                  dataid: listing['id'],
                },
                defaults: {
                  title: listing['title'],
                  text: listing['selftext'],
                  date: listing['created'],
                  score: listing['score'],
                  numComments: listing['num_comments'],
                  permalink: listing['permalink'],
                  subredditId: subreddit.id,
                },
              });
            } catch (err) {
              console.error(err);
            }
          }
        );
        // get the listings on the next few pages
        while (data['data']['after'] != null) {
          listingsUrl = listingsUrl + '&after=' + data['data']['after'];
          response = await fetch(listingsUrl);
          data = await response.json();
          if (data['data'] === undefined || data['data'].length == 0) return;

          data['data']['children'].forEach(
            async (element: { [key: string]: any }) => {
              const listing = element['data'];
              try {
                await RedditListing.findOrCreate({
                  where: {
                    dataid: listing['id'],
                  },
                  defaults: {
                    title: listing['title'],
                    text: listing['selftext'],
                    date: listing['created'],
                    score: listing['score'],
                    numComments: listing['num_comments'],
                    permalink: listing['permalink'],
                    subredditId: subreddit.id,
                  },
                });
              } catch (err) {
                console.error(err);
              }
            }
          );

          try {
            await RedditListing.findOrCreate({
              where: {
                dataid: listing['id'],
              },
              defaults: {
                title: listing['title'],
                text: listing['selftext'],
                date: listing['created'],
                score: listing['score'],
                numComments: listing['num_comments'],
                permalink: listing['permalink'],
                subredditId: subreddit.id,
              },
            });
          } catch (err) {
            console.error(err);
          }
        }
      }
    );
    // get the listings on the next few pages
    while (data['data']['after'] != null) {
      listingsUrl = listingsUrl + '&after=' + data['data']['after'];
      response = await fetch(listingsUrl);
      data = await response.json();
      if (data['data'] === undefined || data['data'].length == 0) return;

      data['data']['children'].forEach(
        async (element: { [key: string]: any }) => {
          const listing = element['data'];
          try {
            await RedditListing.findOrCreate({
              where: {
                dataid: listing['id'],
              },
              defaults: {
                title: listing['title'],
                text: listing['selftext'],
                date: listing['created'],
                score: listing['score'],
                numComments: listing['num_comments'],
                permalink: listing['permalink'],
                subredditId: subreddit.id,
              },
            });
          } catch (err) {
            console.error(err);
          }
        }
      );
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * Uses the reddit url to fetch and store information related
 * to the comments belonging to the provided listing
 * @param {listing} the reddit listing object
 */
const updateComment = async (listing: RedditListing) => {
  const commentUrl = 'https://www.reddit.com' + listing.permalink + '.json';

  let response = await fetch(commentUrl);
  let data = await response.json();
  if (data === undefined || data.length == 0) return;
  const comments = data[1]['data']['children'];
  comments.forEach(async (element: { [key: string]: any }) => {
    const comment: { [key: string]: any } = element['data'];
    if (comment['body'] == undefined) return;
    let num_replies = 0;

    if (comment['replies'] != '') {
      num_replies = comment['replies']['data']['children'].length;
    }
    try {
      await RedditComment.findOrCreate({
        where: {
          dataid: comment['id'],
        },
        defaults: {
          text: comment['body'],
          date: comment['created'],
          score: comment['score'],
          replies: num_replies,
          listingId: listing.id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  });
};
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
