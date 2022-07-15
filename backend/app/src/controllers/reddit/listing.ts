/**
 * Provides the % of comments that are labeled as positive, negative and neutral for media within a specific datetime range
 */

import { RequestHandler } from 'express';
const { sequelize, Op } = require("sequelize");
import { resourceNotFound, unknownError } from '../../globalHelpers/globalConstants';
import RedditComment from '../../models/reddit/comment';
import RedditListing from '../../models/reddit/listing';
import RedditSubreddit from '../../models/reddit/subreddit';

import User from '../../models/user/user';
import getStartEndDate from '../helpers/helpers';

export const getSentimentAnalysisForTimeSeries: RequestHandler = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.session.username },
            include: RedditSubreddit,
        })
        if (!user?.subreddit) return res.send({
            data: []

        })
        const startDateParam = req.query.start;
        const endDateParam = req.query.end;
        let startDate: Date;
        let endDate: Date;
        if (startDateParam && endDateParam) {
            if (startDateParam.length === 8 && endDateParam.length === 8) {
                // parse
                [startDate, endDate] = getStartEndDate(startDateParam.toString(), endDateParam.toString())

                const listingArray = await RedditListing.findAll({
                    where: {
                        subredditId: user?.subreddit.id,
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