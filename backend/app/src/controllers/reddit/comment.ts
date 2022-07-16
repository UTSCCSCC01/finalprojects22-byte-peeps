import { RequestHandler } from 'express';
import {
  invalidDateRangeResponse,
  resourceNotFound,
  unknownError,
} from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import RedditComment from '../../models/reddit/comment';
import RedditListing from '../../models/reddit/listing';
import RedditSubreddit from '../../models/reddit/subreddit';
const { Op } = require('sequelize');
import User from '../../models/user/user';
import {
  SentimentAnalysisStatus,
  SubjectivityAnalysis,
} from '../../globalHelpers/globalConstants';

/**
 * Provides the page number and size, provides comments of any Reddit subreddit related to the user API
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
      include: RedditSubreddit,
    });
    const postId = req.query.postId ?? null;
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const start: string = req.query.startDate.toString();
    const end: string = req.query.endDate.toString();
    const dates = getDates(start, end);

    if (!user?.subreddit) return res.send({ count: 0, data: [] });

    const listings = postId
      ? await RedditListing.findAll({
          where: { subredditId: user!.subreddit.id, id: postId },
        })
      : await RedditListing.findAll({
          where: { subredditId: user!.subreddit.id },
        });
    const listingIds: number[] = listings.map((l) => l.id);
    const comments = await RedditComment.findAll({
      where: {
        listingId: listingIds,
        date: {
          [Op.between]: [dates.startDate, dates.endDate],
        },
      },
      order: [['date', 'DESC']],
      attributes: [
        'id',
        'text',
        'score',
        'replies',
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
      include: RedditSubreddit,
    });

    if (!user?.subreddit)
      return res.send({
        positive: 0,
        neutral: 0,
        negative: 0,
      });

    const listings = postId
      ? await RedditListing.findAll({
          where: { subredditId: user!.subreddit.id, id: postId },
        })
      : await RedditListing.findAll({
          where: { subredditId: user!.subreddit.id },
        });
    const listingIds: number[] = listings.map((l) => l.id);

    const subjective = await RedditComment.count({
      where: {
        listingId: listingIds,
        subjectivityAnalysis: SubjectivityAnalysis.Subjective,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const objective = await RedditComment.count({
      where: {
        listingId: listingIds,
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
      include: RedditSubreddit,
    });

    if (!user?.subreddit)
      return res.send({
        positive: 0,
        neutral: 0,
        negative: 0,
      });

    const listings = postId
      ? await RedditListing.findAll({
          where: { subredditId: user!.subreddit.id, id: postId },
        })
      : await RedditListing.findAll({
          where: { subredditId: user!.subreddit.id },
        });
    const listingIds: number[] = listings.map((l) => l.id);

    const positive = await RedditComment.count({
      where: {
        listingId: listingIds,
        sentimentAnalysis: SentimentAnalysisStatus.Positive,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const neutral = await RedditComment.count({
      where: {
        listingId: listingIds,
        sentimentAnalysis: SentimentAnalysisStatus.Neutral,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const negative = await RedditComment.count({
      where: {
        listingId: listingIds,
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
