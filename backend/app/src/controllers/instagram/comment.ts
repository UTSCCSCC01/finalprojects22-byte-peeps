import { RequestHandler } from 'express';
import {
  invalidInput,
  invalidDateRangeResponse,
  unknownError,
} from '../../globalHelpers/globalConstants';
import InstagramApi from '../../models/instagram/api';
import InstagramComment from '../../models/instagram/comment';
import InstagramMedia from '../../models/instagram/media';
import User from '../../models/user/user';
const { Op } = require('sequelize');
import { SentimentAnalysisStatus, SubjectivityAnalysis } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';

/**
 * Provides the page number and size, provides comments of any IG media related to the user API
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
      include: InstagramApi,
    });
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

    if (!user?.instagramApi) return res.send({ count: 0, data: [] });

    const media = await InstagramMedia.findAll({
      where: { apiId: user!.instagramApi.id },
    });
    const mediaIds: number[] = media.map((m) => m.id);
    const comments = await InstagramComment.findAll({
      where: {
        mediaId: mediaIds,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [['date', 'DESC']],
      attributes: [
        'id',
        'userName',
        'message',
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
 * Provides the 50 most recent Instagram comments belonging to the provided Media
 */
export const getCommentsByMediaId: RequestHandler = async (req, res, next) => {
  const comments = await InstagramComment.findAll({
    where: { mediaId: req.params['mediaId'] },
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
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
      include: InstagramApi,
    });

    if (!user?.instagramApi) return res.send({ subjective: 0, objective: 0 });

    const media = await InstagramMedia.findAll({
      where: { apiId: user!.instagramApi.id },
    });
    const mediaIds: number[] = media.map((m) => m.id);

    const subjective = await InstagramComment.count({
      where: {
        mediaId: mediaIds,
        subjectivityAnalysis: SubjectivityAnalysis.Subjective,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const objective = await InstagramComment.count({
      where: {
        mediaId: mediaIds,
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

/**
 * Provides the % of comments that are labeled as positive, negative and neutral
 */
export const getCommentsSentimentAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  const startDateParam = req.query.start;
  const endDateParam = req.query.end;
  let startDate: Date;
  let endDate: Date;

  if (startDateParam && endDateParam) {
    if (startDateParam.length === 8 && endDateParam.length === 8) {
      const user = await User.findOne({
        where: { username: req.session.username },
        include: InstagramApi,
      });

      if (!user?.instagramApi)
        return res.send({ positive: 0, neutral: 0, negative: 0 });

      // parse
      const year = parseInt(startDateParam.toString().substring(0, 4));
      const month = parseInt(startDateParam.toString().substring(4, 6));
      const day = parseInt(startDateParam.toString().substring(6, 8));

      const year_end = parseInt(endDateParam.toString().substring(0, 4));
      const month_end = parseInt(endDateParam.toString().substring(4, 6));
      const day_end = parseInt(endDateParam.toString().substring(6, 8));

      try {
        startDate = new Date(year, month - 1, day);
        endDate = new Date(year_end, month_end - 1, day_end + 1);

        const media = await InstagramMedia.findAll({
          where: { apiId: user!.instagramApi.id },
        });
        const mediaIds: number[] = media.map((m) => m.id);

        const positive = await InstagramComment.count({
          where: {
            mediaId: mediaIds,
            sentimentAnalysis: SentimentAnalysisStatus.Positive,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
        });
        const neutral = await InstagramComment.count({
          where: {
            mediaId: mediaIds,
            sentimentAnalysis: SentimentAnalysisStatus.Neutral,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
        });
        const negative = await InstagramComment.count({
          where: {
            mediaId: mediaIds,
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
        res.status(400).send(invalidInput);
      }
    }
  } else {
    res.status(400).send(invalidInput);
  }
};
