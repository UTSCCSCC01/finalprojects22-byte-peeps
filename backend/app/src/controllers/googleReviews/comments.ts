import { RequestHandler } from 'express';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import User from '../../models/user/user';
import {
  SentimentAnalysisStatus,
  SubjectivityAnalysis,
} from '../../globalHelpers/globalConstants';
import GoogleReviewsAccount from '../../models/googleReviews/account';
import GoogleReviewsLocation from '../../models/googleReviews/location';
import GoogleReviewsReview from '../../models/googleReviews/review';
const { Op } = require('sequelize');
import { keywordExtraction } from '../../middlewares/keywordExtraction';

export const getCommentsSentimentAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const startDateParam = req.query.startDate?.toString();
    const endDateParam = req.query.endDate?.toString();
    const { startDate, endDate } = getDates(startDateParam, endDateParam);

    if (!startDate || !endDate)
      return res.status(400).send(invalidDateRangeResponse);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: GoogleReviewsAccount,
    });

    if (!user?.googleReviewAccount)
      return res.send({
        positive: 0,
        neutral: 0,
        negative: 0,
      });

    const positive = await GoogleReviewsReview.count({
      where: {
        sentimentAnalysis: SentimentAnalysisStatus.Positive,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: GoogleReviewsLocation,
          attributes: [],
          where: {
            accountId: user!.googleReviewAccount.id,
          },
        },
      ],
    });
    const neutral = await GoogleReviewsReview.count({
      where: {
        sentimentAnalysis: SentimentAnalysisStatus.Neutral,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: GoogleReviewsLocation,
          attributes: [],
          where: {
            accountId: user!.googleReviewAccount.id,
          },
        },
      ],
    });
    const negative = await GoogleReviewsReview.count({
      where: {
        sentimentAnalysis: SentimentAnalysisStatus.Negative,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: GoogleReviewsLocation,
          attributes: [],
          where: {
            accountId: user!.googleReviewAccount.id,
          },
        },
      ],
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

    const { startDate, endDate } = getDates(startDateParam, endDateParam);

    if (!startDate || !endDate)
      return res.status(400).send(invalidDateRangeResponse);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: GoogleReviewsAccount,
    });

    if (!user?.googleReviewAccount) {
      return res.send({
        subjective: 0,
        objective: 0,
      });
    }

    const subjective = await GoogleReviewsReview.count({
      where: {
        subjectivityAnalysis: SubjectivityAnalysis.Subjective,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: GoogleReviewsLocation,
          attributes: [],
          where: {
            accountId: user!.googleReviewAccount.id,
          },
        },
      ],
    });

    const objective = await GoogleReviewsReview.count({
      where: {
        subjectivityAnalysis: SubjectivityAnalysis.Subjective,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: GoogleReviewsLocation,
          attributes: [],
          where: {
            accountId: user!.googleReviewAccount.id,
          },
        },
      ],
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
      include: GoogleReviewsAccount,
    });

    if (!user?.googleReviewAccount) return res.send([]);

    const comments = await GoogleReviewsReview.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ['review'],
    });

    function getText(acc: string, comment: { review: string }) {
      return acc.concat(' ', comment.review);
    }
    const getKeywords = comments.reduce(getText, ' ');
    res.send(keywordExtraction(getKeywords));
  } catch (e) {
    next(e);
  }
};
