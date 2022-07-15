import { RequestHandler } from 'express';
import { invalidDateRangeResponse, unknownError } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import FacebookApi from '../../models/facebook/api';
import FacebookComment from '../../models/facebook/comment';
import FacebookPost from '../../models/facebook/post';
import User from '../../models/user/user';
import { SentimentAnalysisStatus, SubjectivityAnalysis } from '../../globalHelpers/globalConstants';
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

    if (!user?.facebookApi) return res.send({ count: 0, data: [] });

    const posts = await FacebookPost.findAll({
      where: { apiId: user!.facebookApi.id },
    });
    const postIds: number[] = posts.map((p) => p.id);
    const comments = await FacebookComment.findAll({
      where: {
        postId: postIds,
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
 * Provides the 50 most recent Facebook comments belonging to the provided Media
 */
export const getCommentsByPostId: RequestHandler = async (req, res, next) => {
  const comments = await FacebookComment.findAll({
    where: { postId: req.params['postId'] },
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
      include: FacebookApi,
    });

    if (!user?.facebookApi) return res.send({ subjective: 0, objective: 0 });

    const posts = await FacebookPost.findAll({
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
  const startDateParam = req.query.start;
  const endDateParam = req.query.end;

  let startDate: Date;
  let endDate: Date;

  if (startDateParam && endDateParam) {
    if (startDateParam.length === 8 && endDateParam.length === 8) {
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

        const posts = await FacebookPost.findAll({
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
        res.status(400).send({ message: 'Date Input not Provided' });
      }
    }
  } else {
    res.status(400).send({ message: 'Invalid Date Input' });
  }
};
