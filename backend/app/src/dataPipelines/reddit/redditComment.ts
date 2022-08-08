import { CronJob } from 'cron';
import fetch from 'node-fetch';
import Subreddit from '../../models/reddit/subreddit';
import RedditListing from '../../models/reddit/listing';
import RedditComment from '../../models/reddit/comment';
import DatumBoxAPICall from '../../middlewares/datumBox/datumBox';

const RedditBaseUrl = 'https://www.reddit.com';
/**
 * Uses the reddit url to fetch and store information related
 * to the comments belonging to the provided listing
 * @param {listing} the reddit listing object
 */
export const updateComment = async (listing: RedditListing) => {
    const commentUrl = listing.permalink + '.json';


    let response = await fetch(commentUrl);
    let data = await response.json();
    if (data === undefined || data.length == 0) return;
    const comments = data[1]['data']['children'];
    await Promise.all(comments.map(async (element: { [key: string]: any }) => {
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
            await RedditComment.findOne({
                where: {
                    dataId: comment['id'],
                }
            }).then(async function (obj) {
                if (obj) {
                    await obj.update({
                        text: commentText,
                        date: create_date,
                        score: comment['score'],
                        replies: num_replies,
                        listingId: listing.id,
                        sentimentAnalysis: textAnalysis.SentimentAnalysis,
                        subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
                        topicClassification: textAnalysis.TopicClassification,
                    })
                } else {
                    await RedditComment.create({
                        dataId: comment['id'],
                        text: commentText,
                        date: create_date,
                        score: comment['score'],
                        replies: num_replies,
                        listingId: listing.id,
                        sentimentAnalysis: textAnalysis.SentimentAnalysis,
                        subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
                        topicClassification: textAnalysis.TopicClassification,
                    })
                }
            })

        } catch (err) {
            console.error(err);
        }
    }))

};