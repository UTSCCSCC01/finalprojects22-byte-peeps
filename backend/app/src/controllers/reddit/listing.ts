/**
 * Provides the % of comments that are labeled as positive, negative and neutral for media within a specific datetime range
 */

import { RequestHandler } from 'express';
import { Op } from 'sequelize/types';
import { resourceNotFound, unknownError } from '../../globalHelpers/globalConstants';
import RedditComment from '../../models/reddit/comment';
import RedditListing from '../../models/reddit/listing';
import RedditSubreddit from '../../models/reddit/subreddit';

import User from '../../models/user/user';

export const getSentimentAnalysisForTimeSeries: RequestHandler = async (req, res, next) => {
    const startDateParam = req.query.start;
    const endDateParam = req.query.end;
    let startDate: Date;
    let endDate: Date;
    try {
        const user = await User.findOne({
            where: { username: req.session.username },
            include: RedditSubreddit,
        })
        if (!user?.subreddit) return res.send({
            data: []

        })

        if (startDateParam && endDateParam) {
            if (startDateParam.length === 8 && endDateParam.length === 8) {
                // parse
                const year = parseInt((startDateParam.toString()).substring(0, 4));
                const month = parseInt((startDateParam.toString()).substring(4, 6));
                const day = parseInt((startDateParam.toString()).substring(6, 8));

                const year_end = parseInt((endDateParam.toString()).substring(0, 4));
                const month_end = parseInt((endDateParam.toString()).substring(4, 6));
                const day_end = parseInt((endDateParam.toString()).substring(6, 8));

                startDate = new Date(year, month - 1, day);
                endDate = new Date(year_end, month_end - 1, day_end + 1);

                const listingArray = await RedditListing.findAll({
                    where: {
                        apiId: user?.subreddit.id,
                        date: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    order: [['date', 'ASC']]
                })
                const data: any[] = []

                for (const listing of listingArray) {

                    const positive = await RedditComment.count({
                        where: {
                            listingId: listing.id,
                            sentimentAnalysis: 'positive'

                        },
                    });

                    const negative = await RedditComment.count({
                        where: {
                            listingId: listing.id,
                            sentimentAnalysis: 'negative'

                        },
                    });

                    const neutral = await RedditComment.count({
                        where: {
                            listingId: listing.id,
                            sentimentAnalysis: 'neutral'

                        },
                    });

                    const total = positive + negative + neutral
                    data.push({
                        date: listing.date.toLocaleDateString(),
                        time: listing.date.toLocaleTimeString('it-IT'),
                        positive: positive / total * 100,
                        negative: negative / total * 100,
                        neutral: neutral / total * 100
                    })
                }


                res.send({ data: data })

            } else {
                res.status(404).json({ message: resourceNotFound });
            }
        }


    } catch (e) {
        console.log(e);
        res.status(500).json({ message: unknownError })
    }
}