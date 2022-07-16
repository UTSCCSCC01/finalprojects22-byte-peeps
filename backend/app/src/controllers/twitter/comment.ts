import { RequestHandler } from 'express';
import {
  invalidDateRangeResponse,
  resourceNotFound,
  unknownError,
} from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import InstagramComment from '../../models/instagram/comment';
const { Op } = require('sequelize');
import TwitterConversation from '../../models/twitter/conversation';
import TwitterTweet from '../../models/twitter/tweet';
import TwitterUser from '../../models/twitter/user';
import User from '../../models/user/user';
import { SentimentAnalysisStatus } from '../enums';

/**
 * Provides the page number and size, provides comments of any Twitter tweet related to the user API
 */
export const getComments: RequestHandler = async (req, res, next) => {
  try {
    if (
      !req.query.startDate ||
      req.query.startDate.length !== 8 ||
      !req.query.endDate ||
      req.query.endDate.length !== 8
    )
      return res.status(400).send();

    const user = await User.findOne({
      where: { username: req.session.username },
      include: TwitterUser,
    });
    const postId = req.query.postId ?? null;
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const start: string = req.query.startDate.toString();
    const end: string = req.query.endDate.toString();
    const dates = getDates(start, end);

    if (!user?.twitterUser) return res.send({ count: 0, data: [] });

    const tweets = postId
      ? await TwitterTweet.findAll({
          where: { twitterUserId: user!.twitterUser.id, id: postId },
        })
      : await TwitterTweet.findAll({
          where: { twitterUserId: user!.twitterUser.id },
        });
    const tweetIds: number[] = tweets.map((p) => p.id);
    const comments = await TwitterConversation.findAll({
      where: {
        tweetId: tweetIds,
        date: {
          [Op.between]: [dates.startDate, dates.endDate],
        },
      },
      order: [['date', 'DESC']],
      attributes: [
        'id',
        'text',
        'retweets',
        'replies',
        'likes',
        'sentimentAnalysis',
        'topicClassification',
        'subjectivityAnalysis',
      ],
    });
    const filteredComments = comments.slice(
      pageNumber * pageSize,
      pageNumber * pageSize + pageSize
    );
    res.send({ count: comments.length, data: filteredComments });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: unknownError });
  }
};

/**
 * Provides the % of comments that are labeled as subjective
 */
export const getCommentsSubjectivityAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const startDateParam = req.query.start?.toString();
    const endDateParam = req.query.end?.toString();

    const { startDate, endDate } = getDates(startDateParam, endDateParam);

    if (!startDate || !endDate)
      return res.status(400).send(invalidDateRangeResponse);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: TwitterUser,
    });

    if (!user?.twitterUser)
      return res.send({
        positive: 0,
        neutral: 0,
        negative: 0,
      });

    const tweets = await TwitterTweet.findAll({
      where: { twitterUserId: user!.twitterUser.id },
    });
    const tweetIds: number[] = tweets.map((p) => p.id);

    const subjective = await TwitterConversation.count({
      where: {
        tweetId: tweetIds,
        subjectivityAnalysis: 'subjective',
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const objective = await TwitterConversation.count({
      where: {
        tweetId: tweetIds,
        subjectivityAnalysis: 'objective',
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.send({
      subjective: subjective,
      objective: objective,
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsSentimentAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const startDateParam = req.query.start?.toString();
    const endDateParam = req.query.end?.toString();

    const { startDate, endDate } = getDates(startDateParam, endDateParam);

    if (!startDate || !endDate)
      return res.status(400).send(invalidDateRangeResponse);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: TwitterUser,
    });

    if (!user?.twitterUser)
      return res.send({
        positive: 0,
        neutral: 0,
        negative: 0,
      });

    const tweets = await TwitterTweet.findAll({
      where: { twitterUserId: user!.twitterUser.id },
    });
    const tweetIds: number[] = tweets.map((p) => p.id);

    const positive = await TwitterConversation.count({
      where: {
        tweetId: tweetIds,
        sentimentAnalysis: SentimentAnalysisStatus.Positive,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const neutral = await TwitterConversation.count({
      where: {
        tweetId: tweetIds,
        sentimentAnalysis: SentimentAnalysisStatus.Neutral,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const negative = await TwitterConversation.count({
      where: {
        tweetId: tweetIds,
        sentimentAnalysis: SentimentAnalysisStatus.Negative,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.send({
      positive: positive,
      negative: negative,
      neutral: neutral,
    });
  } catch (error) {
    next(error);
  }
};
