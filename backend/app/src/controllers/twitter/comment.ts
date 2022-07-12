import { RequestHandler } from "express";
import { unknownError } from "../../globalHelpers/globalConstants";
const { Op } = require('sequelize');
import TwitterConversation from "../../models/twitter/conversation";
import TwitterTweet from "../../models/twitter/tweet";
import TwitterUser from "../../models/twitter/user";
import User from "../../models/user/user";

/**
 * Provides the page number and size, provides comments of any Twitter tweet related to the user API
 */
 export const getComments: RequestHandler = async (req, res, next) => {
  try {
    if (!req.query.startDate || req.query.startDate.length !== 8 
      || !req.query.endDate || req.query.endDate.length !== 8)
      return res.status(400).send();
    
    const user = await User.findOne({where: { username: req.session.username }, include: TwitterUser});
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const startDateParam = req.query.startDate!.toString();
    const startYear = parseInt(startDateParam.toString().substring(0, 4));
    const startMonth = parseInt(startDateParam.toString().substring(4, 6));
    const startDay = parseInt(startDateParam.toString().substring(6, 8));
    const startDate = new Date(startYear, startMonth - 1, startDay);

    const endDateParam = req.query.endDate!.toString();
    const endYear = parseInt(endDateParam.toString().substring(0, 4));
    const endMonth = parseInt(endDateParam.toString().substring(4, 6));
    const endDay = parseInt(endDateParam.toString().substring(6, 8));
    const endDate = new Date(endYear, endMonth - 1, endDay + 1);

    if (!user?.twitterUser)
      return res.send({ count: 0, data: [] });

    const tweets = await TwitterTweet.findAll({ where: { apiId: user!.twitterUser.id }});
    const tweetIds: number[] = tweets.map(p => p.id);
    const comments = await TwitterConversation.findAll({
      where: {
        tweetId: tweetIds,
        date: {
          [Op.between]: [startDate, endDate],
        }
      },
      order: [
        ['date', 'DESC']
      ],
      attributes: [
        'id',
        'text',
        'retweets',
        'replies',
        'likes',
        'sentimentAnalysis',
        'topicClassification',
        'subjectivityAnalysis'
      ]
    });
    const filteredComments = comments.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
    res.send({ count: comments.length, data: filteredComments });
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: unknownError });
  }
};