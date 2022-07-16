import { RequestHandler } from 'express';
const { sequelize, Op } = require("sequelize");
import { resourceNotFound, unknownError } from '../../globalHelpers/globalConstants';
import RedditComment from '../../models/reddit/comment';
import TwitterConversation from '../../models/twitter/conversation';
import TwitterTweet from '../../models/twitter/tweet';
import TwitterUser from '../../models/twitter/user';
import User from '../../models/user/user';
import getStartEndDate from '../helpers/helpers';

export const getSentimentAnalysisForTimeSeries: RequestHandler = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.session.username },
            include: TwitterUser,
        })
        if (!user?.twitterUser) return res.send({
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

                const tweetArray = await TwitterTweet.findAll({
                    where: {
                        twitterUserId: user?.twitterUser.id,
                        date: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    order: [['date', 'ASC']]
                })
                const data: any[] = []

                for (const tweet of tweetArray) {

                    const positive = await TwitterConversation.count({
                        where: {
                            tweetId: tweet.id,
                            sentimentAnalysis: 'positive'

                        },
                    });
                    const negative = await TwitterConversation.count({
                        where: {
                            tweetId: tweet.id,
                            sentimentAnalysis: 'negative'

                        },
                    });
                    const neutral = await TwitterConversation.count({
                        where: {
                            tweetId: tweet.id,
                            sentimentAnalysis: 'neutral'

                        },
                    });

                    const total = positive + negative + neutral
                    data.push({
                        date: tweet.date.toLocaleDateString(),
                        time: tweet.date.toLocaleTimeString('it-IT'),
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