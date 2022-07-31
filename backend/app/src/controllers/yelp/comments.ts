import { RequestHandler } from 'express';
import {
  invalidDateRangeResponse,
  invalidInput,
  unknownError,
} from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import YelpReview from '../../models/yelp/review';
import YelpBusiness from '../../models/yelp/business';
import User from '../../models/user/user';
import {
  SentimentAnalysisStatus,
  SubjectivityAnalysis,
} from '../../globalHelpers/globalConstants';
const { Op } = require('sequelize');
import { keywordExtraction } from '../../middlewares/keywordExtraction';

/**
 * Provides the page number and size, provides comments of any Yelp review related to the user API
 */
export const getComments: RequestHandler = async (req, res, next) => {
  try {
    if (
      !req.query.startDate ||
      req.query.startDate.length !== 8 ||
      !req.query.endDate ||
      req.query.endDate.length !== 8
    )
      return res.status(400).send(invalidInput);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: YelpBusiness,
    });
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const start: string = req.query.startDate.toString();
    const end: string = req.query.endDate.toString();
    const dates = getDates(start, end);

    if (!user?.yelpBusiness) return res.send({ count: 0, data: [] });

    const reviews = await YelpReview.findAll({
      where: {
        businessId: user.yelpBusiness.id,
        ...res.locals.getFilterCondition(),
        date: {
          [Op.between]: [dates.startDate, dates.endDate],
        },
      },
      order: [['date', 'DESC']],
      attributes: [
        'id',
        'text',
        'userName',
        'rating',
        'sentimentAnalysis',
        'topicClassification',
        'subjectivityAnalysis',
      ],
    });
    const filteredReviews = reviews.slice(
      pageNumber * pageSize,
      pageNumber * pageSize + pageSize
    );
    res.send({ count: reviews.length, data: filteredReviews });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: unknownError });
  }
};

export const getCommentsSentimentAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const startDateParam = req.query.startDate?.toString();
    const endDateParam = req.query.endDate?.toString();
    const postId = req.query.postId;
    const { startDate, endDate } = getDates(startDateParam, endDateParam);

    if (!startDate || !endDate)
      return res.status(400).send(invalidDateRangeResponse);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: YelpBusiness,
    });

    if (!user?.yelpBusiness)
      return res.send({
        positive: 0,
        neutral: 0,
        negative: 0,
      });
    const positive = await YelpReview.count({
      where: {
        businessId: user!.yelpBusiness.id,
        sentimentAnalysis: SentimentAnalysisStatus.Positive,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const neutral = await YelpReview.count({
      where: {
        businessId: user!.yelpBusiness.id,
        sentimentAnalysis: SentimentAnalysisStatus.Neutral,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const negative = await YelpReview.count({
      where: {
        businessId: user!.yelpBusiness.id,
        sentimentAnalysis: SentimentAnalysisStatus.Negative,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.send({
      positive: positive,
      neutral: neutral,
      negative: negative,
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsSubjectivityAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const startDateParam = req.query.startDate?.toString();
    const endDateParam = req.query.endDate?.toString();
    const postId = req.query.postId;

    const { startDate, endDate } = getDates(startDateParam, endDateParam);

    if (!startDate || !endDate)
      return res.status(400).send(invalidDateRangeResponse);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: YelpBusiness,
    });

    if (!user?.yelpBusiness)
      return res.send({
        subjective: 0,
        objective: 0,
      });

    const subjective = await YelpReview.count({
      where: {
        businessId: user!.yelpBusiness.id,
        subjectivityAnalysis: SubjectivityAnalysis.Subjective,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const objective = await YelpReview.count({
      where: {
        businessId: user!.yelpBusiness.id,
        subjectivityAnalysis: SubjectivityAnalysis.Objective,
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

export const getWordCloudData: RequestHandler = async (req, res, next) => {
  try {
    const startDateParam = req.query.startDate?.toString();
    const endDateParam = req.query.endDate?.toString();

    const { startDate, endDate } = getDates(startDateParam, endDateParam);

    if (!startDate || !endDate)
      return res.status(400).send(invalidDateRangeResponse);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: YelpBusiness,
    });

    if (!user?.yelpBusiness) return res.send([]);

    const comments = await YelpReview.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ['text'],
    });

    function getText(acc: string, comment: { text: string }) {
      return acc.concat(' ', comment.text);
    }
    const getKeywords = comments.reduce(getText, ' ');
    res.send(keywordExtraction(getKeywords));
  } catch (e) {
    next(e);
  }
};
