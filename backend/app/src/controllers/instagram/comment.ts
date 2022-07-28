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
import {
  SentimentAnalysisStatus,
  SubjectivityAnalysis,
} from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import { keywordExtraction } from '../../middlewares/keywordExtraction';

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
    const postId = req.query.postId ?? null;
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const start: string = req.query.startDate.toString();
    const end: string = req.query.endDate.toString();
    const dates = getDates(start, end);

    if (!user?.instagramApi) return res.send({ count: 0, data: [] });

    const media = postId
      ? await InstagramMedia.findAll({
          where: { apiId: user!.instagramApi.id, id: postId },
        })
      : await InstagramMedia.findAll({
          where: { apiId: user!.instagramApi.id },
        });
    const mediaIds: number[] = media.map((m) => m.id);
    const comments = await InstagramComment.findAll({
      where: {
        mediaId: mediaIds,
        date: {
          [Op.between]: [dates.startDate, dates.endDate],
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
 * Provides the % of comments that are labeled as subjective
 */
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
      include: InstagramApi,
    });

    if (!user?.instagramApi) return res.send({ subjective: 0, objective: 0 });

    const media = postId
      ? await InstagramMedia.findAll({
          where: { apiId: user!.instagramApi.id, id: postId },
        })
      : await InstagramMedia.findAll({
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
  try {
    const startDateParam = req.query.startDate?.toString();
    const endDateParam = req.query.endDate?.toString();
    const postId = req.query.postId;

    const { startDate, endDate } = getDates(startDateParam, endDateParam);

    if (!startDate || !endDate)
      return res.status(400).send(invalidDateRangeResponse);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: InstagramApi,
    });

    if (!user?.instagramApi) return res.send({ subjective: 0, objective: 0 });

    const media = postId
      ? await InstagramMedia.findAll({
          where: { apiId: user!.instagramApi.id, id: postId },
        })
      : await InstagramMedia.findAll({
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
      include: InstagramApi,
    });

    if (!user?.instagramApi) return res.send([]);

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
      attributes: ['message'],
    });

    function getText(acc: string, comment: { message: string }) {
      return acc.concat(' ', comment.message);
    }
    const getKeywords = comments.reduce(getText, ' ');
    res.send(keywordExtraction(getKeywords));
  } catch (e) {
    next(e);
  }
};
