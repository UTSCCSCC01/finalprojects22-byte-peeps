import { CronJob } from 'cron';
import fetch from 'node-fetch';
import Subreddit from '../models/reddit/subreddit';
import RedditListing from '../models/reddit/listing';
import RedditComment from '../models/reddit/comment';
import DatumBoxAPICall from '../middlewares/datumBox/datumBox';

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

export async function startPipeline() {
  try {
    /* Get stored subreddits*/
    let subreddits = await Subreddit.findAll();

    if (subreddits.length == 0) return;

    /* Update data for each subreddit */
    for (let i = 0; i < subreddits.length; i++) {
      /* Fetch and update listings */
      await updateListings(subreddits[i]);
    }
  } catch (err) {
    console.error(err);
  }

  try {
    /* Get stored reddit listings*/
    let redditListings = await RedditListing.findAll();
    if (redditListings.length == 0) return;

    /* Update comment for each listing */
    for (let i = 0; i < redditListings.length; i++) {
      await updateComment(redditListings[i]);
    }
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
        const create_date = new Date(listing['created'] * 1000);
        let response = await fetch(listingsUrl);
        let data = await response.json();
        if (data['data'] === undefined || data['data'].length == 0) return;

        data['data']['children'].forEach(
          async (element: { [key: string]: any }) => {
            const listing = element['data'];
            let listingText = listing['selftext'];

            let textAnalysis = await DatumBoxAPICall(listingText);

            const create_date = new Date(listing['created'] * 1000);
            try {
              await RedditListing.findOrCreate({
                where: {
                  dataId: listing['id'],
                },
                defaults: {
                  title: listing['title'],
                  text: listing['selftext'],
                  date: create_date,
                  score: listing['score'],
                  numComments: listing['num_comments'],
                  permalink: 'https://www.reddit.com' + listing['permalink'],
                  subredditId: subreddit.id,
                  sentimentAnalysis: textAnalysis.SentimentAnalysis,
                  subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
                  topicClassification: textAnalysis.TopicClassification,
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
              let listingText = listing['selftext'];

              let textAnalysis = await DatumBoxAPICall(listingText);

              const create_date = new Date(listing['created'] * 1000);

              try {
                await RedditListing.findOrCreate({
                  where: {
                    dataId: listing['id'],
                  },
                  defaults: {
                    title: listing['title'],
                    text: listing['selftext'],
                    date: create_date,
                    score: listing['score'],
                    numComments: listing['num_comments'],
                    permalink: 'https://www.reddit.com' + listing['permalink'],
                    subredditId: subreddit.id,
                    sentimentAnalysis: textAnalysis.SentimentAnalysis,
                    subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
                    topicClassification: textAnalysis.TopicClassification,
                  },
                });
              } catch (err) {
                console.error(err);
              }
            }
          );

          try {
            let listingText = listing['selftext'];

            let textAnalysis = await DatumBoxAPICall(listingText);

            await RedditListing.findOrCreate({
              where: {
                dataId: listing['id'],
              },
              defaults: {
                title: listing['title'],
                text: listingText,
                date: create_date,
                score: listing['score'],
                numComments: listing['num_comments'],
                permalink: 'https://www.reddit.com' + listing['permalink'],
                subredditId: subreddit.id,
                sentimentAnalysis: textAnalysis.SentimentAnalysis,
                subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
                topicClassification: textAnalysis.TopicClassification,
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
          const create_date = new Date(listing['created'] * 1000);
          let listingText = listing['selftext'];
          let textAnalysis = await DatumBoxAPICall(listingText);

          try {
            await RedditListing.findOrCreate({
              where: {
                dataId: listing['id'],
              },
              defaults: {
                title: listing['title'],
                text: listing['selftext'],
                date: create_date,
                score: listing['score'],
                numComments: listing['num_comments'],
                permalink: 'https://www.reddit.com' + listing['permalink'],
                subredditId: subreddit.id,
                sentimentAnalysis: textAnalysis.SentimentAnalysis,
                subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
                topicClassification: textAnalysis.TopicClassification,
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
  const commentUrl = listing.permalink + '.json';

  let response = await fetch(commentUrl);
  let data = await response.json();
  if (data === undefined || data.length == 0) return;
  const comments = data[1]['data']['children'];

  comments.forEach(async (element: { [key: string]: any }) => {
    const comment: { [key: string]: any } = element['data'];
    const create_date = new Date(comment['created'] * 1000);
    if (comment['body'] == undefined) return;
    let num_replies = 0;

    if (comment['replies'] != '') {
      num_replies = comment['replies']['data']['children'].length;
    }
    let commentText = comment['body'];
    let textAnalysis = await DatumBoxAPICall(commentText);

    try {
      await RedditComment.findOrCreate({
        where: {
          dataId: comment['id'],
        },
        defaults: {
          text: commentText,
          date: create_date,
          score: comment['score'],
          replies: num_replies,
          listingId: listing.id,
          sentimentAnalysis: textAnalysis.SentimentAnalysis,
          subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
          topicClassification: textAnalysis.TopicClassification,
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
