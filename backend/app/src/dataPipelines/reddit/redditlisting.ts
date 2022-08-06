import { CronJob } from 'cron';
import fetch from 'node-fetch';
import Subreddit from '../../models/reddit/subreddit';
import RedditListing from '../../models/reddit/listing';
import RedditComment from '../../models/reddit/comment';
import DatumBoxAPICall from '../../middlewares/datumBox/datumBox';

const RedditBaseUrl = 'https://www.reddit.com';

/**
 * Uses the reddit url to fetch and store information related
 * to Reddit listings belonging to a particular Subreddit
 * @param {subreddit} the Subreddit object
 */
export const updateListings = async (subreddit: Subreddit, firstTime: boolean) => {
    const dateRange = firstTime ? 'week' : 'day';
    const listingsUrl =
        RedditBaseUrl +
        '/r/' +
        subreddit.name +
        '/top.json?t=' +
        dateRange +
        '&raw_json=1';

    /* Perform request */
    try {
        let response = await fetch(listingsUrl);
        console.log(listingsUrl);
        let data = await response.json();
        if (data['data'] === undefined || data['data'].length == 0) return;
        // go through each listing inside children
        await Promise.all(data['data']['children'].map(
            async (element: { [key: string]: any }) => {
                const listing = element['data'];
                let listingText = listing['selftext'];

                let textAnalysis = await DatumBoxAPICall(listingText);

                const create_date = new Date(listing['created'] * 1000);
                try {
                    // store the listing in the database
                    await RedditListing.findOne({
                        where: {
                            dataId: listing['id'],
                        },
                    }).then(async function (obj) {
                        if (obj) {
                            await obj.update({
                                title: listing['title'],
                                text: listing['selftext'],
                                date: create_date,
                                score: listing['score'],
                                numComments: listing['num_comments'],
                                permalink: 'https://www.reddit.com' + listing['permalink'],
                                sentimentAnalysis: textAnalysis.SentimentAnalysis,
                                subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
                                topicClassification: textAnalysis.TopicClassification,
                                subredditId: subreddit.id,
                            })
                        } else {
                            await RedditListing.create({
                                dataId: listing['id'],
                                title: listing['title'],
                                text: listing['selftext'],
                                date: create_date,
                                score: listing['score'],
                                numComments: listing['num_comments'],
                                permalink: 'https://www.reddit.com' + listing['permalink'],
                                sentimentAnalysis: textAnalysis.SentimentAnalysis,
                                subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
                                topicClassification: textAnalysis.TopicClassification,
                                subredditId: subreddit.id,
                            })
                        }
                    })

                } catch (err) {
                    console.error(err);
                }
            }
        ))
        // only get the first page to increase demo speed
        // let pageCount = 0
        // while (data['data']['after'] != null || pageCount > 1) {
        //     pageCount += 1;
        //     console.log(data['data']['after'])
        //     const afterUrl = listingsUrl + '&after=' + data['data']['after'];
        //     console.log(afterUrl)
        //     response = await fetch(afterUrl);
        //     data = await response.json();
        //     if (data['data'] === undefined || data['data'].length == 0) return;
        //     await Promise.all(data['data']['children'].map(
        //         async (element: { [key: string]: any }) => {
        //             const listing = element['data'];
        //             let listingText = listing['selftext'];

        //             let textAnalysis = await DatumBoxAPICall(listingText);

        //             const create_date = new Date(listing['created'] * 1000);

        //             try {
        //                 await RedditListing.findOne({
        //                     where: {
        //                         dataId: listing['id'],
        //                     }
        //                 }).then(async function (obj) {
        //                     if (obj) {
        //                         await obj.update({
        //                             title: listing['title'],
        //                             text: listing['selftext'],
        //                             date: create_date,
        //                             score: listing['score'],
        //                             numComments: listing['num_comments'],
        //                             permalink: 'https://www.reddit.com' + listing['permalink'],
        //                             subredditId: subreddit.id,
        //                             sentimentAnalysis: textAnalysis.SentimentAnalysis,
        //                             subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
        //                             topicClassification: textAnalysis.TopicClassification,
        //                         })
        //                     } else {
        //                         await RedditListing.create({
        //                             dataId: listing['id'],
        //                             title: listing['title'],
        //                             text: listing['selftext'],
        //                             date: create_date,
        //                             score: listing['score'],
        //                             numComments: listing['num_comments'],
        //                             permalink: 'https://www.reddit.com' + listing['permalink'],
        //                             subredditId: subreddit.id,
        //                             sentimentAnalysis: textAnalysis.SentimentAnalysis,
        //                             subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
        //                             topicClassification: textAnalysis.TopicClassification,
        //                         })
        //                     }
        //                 })

        //             } catch (err) {
        //                 console.error(err);
        //             }
        //         }
        //     ))
        // }
    } catch (err) {
        console.error(err);
    }
}
