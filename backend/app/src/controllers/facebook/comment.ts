import { RequestHandler } from 'express';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import FacebookApi from '../../models/facebook/api';
import FacebookComment from '../../models/facebook/comment';
import FacebookPost from '../../models/facebook/post';
import User from '../../models/user/user';
import {
  SentimentAnalysisStatus,
  SubjectivityAnalysis,
} from '../../globalHelpers/globalConstants';
const { Op } = require('sequelize');

/**
 * Provides the page number and size, provides comments of any Facebook posts related to the user API
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
      include: FacebookApi,
    });
    const postId = req.query.postId ?? null;
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const start: string = req.query.startDate.toString();
    const end: string = req.query.endDate.toString();
    const dates = getDates(start, end);

    if (!user?.facebookApi) return res.send({ count: 0, data: [] });

    const posts = postId
      ? await FacebookPost.findAll({
          where: { apiId: user!.facebookApi.id, id: postId },
        })
      : await FacebookPost.findAll({
          where: { apiId: user!.facebookApi.id },
        });
    const postIds: number[] = posts.map((p) => p.id);
    const comments = await FacebookComment.findAll({
      where: {
        postId: postIds,
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
  } catch (error) {
    next(error);
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
      include: FacebookApi,
    });

    if (!user?.facebookApi) return res.send({ subjective: 0, objective: 0 });

    const posts = postId
      ? await FacebookPost.findAll({
          where: { apiId: user!.facebookApi.id, id: postId },
        })
      : await FacebookPost.findAll({
          where: { apiId: user!.facebookApi.id },
        });
    const postIds: number[] = posts.map((p) => p.id);

    const subjective = await FacebookComment.count({
      where: {
        postId: postIds,
        subjectivityAnalysis: SubjectivityAnalysis.Subjective,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    const objective = await FacebookComment.count({
      where: {
        postId: postIds,
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
      include: FacebookApi,
    });

    if (!user?.facebookApi)
      return res.send({
        positive: 0,
        neutral: 0,
        negative: 0,
      });

    const posts = postId
      ? await FacebookPost.findAll({
          where: { apiId: user!.facebookApi.id, id: postId },
        })
      : await FacebookPost.findAll({
          where: { apiId: user!.facebookApi.id },
        });
    const postIds: number[] = posts.map((p) => p.id);

    const positive = await FacebookComment.count({
      where: {
        postId: postIds,
        sentimentAnalysis: SentimentAnalysisStatus.Positive,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    const neutral = await FacebookComment.count({
      where: {
        postId: postIds,
        sentimentAnalysis: SentimentAnalysisStatus.Neutral,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    const negative = await FacebookComment.count({
      where: {
        postId: postIds,
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
