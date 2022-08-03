import { RequestHandler } from 'express';
const { Op } = require('sequelize');
import {
  resourceNotFound,
  unknownError,
  SentimentAnalysisStatus,
  SubjectivityAnalysis,
} from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import RedditComment from '../../models/reddit/comment';
import RedditListing from '../../models/reddit/listing';
import RedditSubreddit from '../../models/reddit/subreddit';

import User from '../../models/user/user';
import getStartEndDate from '../helpers/helpers';

/**
 * Provides the id and message of the user's Facebook posts in the specific date range
 */
export const getListings: RequestHandler = async (req, res, next) => {
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

  const start: string = req.query.startDate.toString();
  const end: string = req.query.endDate.toString();
  const dates = getDates(start, end);

  if (!user?.subreddit) return res.send({ count: 0, data: [] });

  const posts = await RedditListing.findAll({
    where: {
      subredditId: user!.subreddit.id,
      date: {
        [Op.between]: [dates.startDate, dates.endDate],
      },
    },
    attributes: ['id', ['title', 'label'], 'date', ['dataId', 'pid']],
  });

  res.send(posts);
};

/**
 * Provides the page number and size, provides comments of any Reddit listings related to the user API
 */
export const getListingTable: RequestHandler = async (req, res, next) => {
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
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const start: string = req.query.startDate.toString();
    const end: string = req.query.endDate.toString();
    const dates = getDates(start, end);

    if (!user?.subreddit) return res.send({ count: 0, data: [] });

    const listings = await RedditListing.findAll({
      where: {
        subredditId: user!.subreddit.id,
        ...res.locals.getFilterCondition(),
        date: {
          [Op.between]: [dates.startDate, dates.endDate],
        },
      },
      order: [['date', 'DESC']],
      attributes: [
        'id',
        'title',
        'text',
        'score',
        'numComments',
        'sentimentAnalysis',
        'topicClassification',
        'subjectivityAnalysis',
      ],
    });

    const filteredListings = listings.slice(
      pageNumber * pageSize,
      pageNumber * pageSize + pageSize
    );
    res.send({ count: listings.length, data: filteredListings });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: unknownError });
  }
};

/**
 * Provides the % of comments that are labeled as positive, negative and neutral for media within a specific datetime range
 */
export const getSentimentAnalysisForTimeSeries: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: RedditSubreddit,
    });
    if (!user?.subreddit)
      return res.send({
        data: [],
      });
    const startDateParam = req.query.start;
    const endDateParam = req.query.end;
    let startDate: Date;
    let endDate: Date;
    if (startDateParam && endDateParam) {
      if (startDateParam.length === 8 && endDateParam.length === 8) {
        // parse
        [startDate, endDate] = getStartEndDate(
          startDateParam.toString(),
          endDateParam.toString()
        );

        const listingArray = await RedditListing.findAll({
          where: {
            subredditId: user?.subreddit.id,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [['date', 'ASC']],
        });
        const data: any[] = [];

        for (const listing of listingArray) {
          const positive = await RedditComment.count({
            where: {
              listingId: listing.id,
              sentimentAnalysis: SentimentAnalysisStatus.Positive,
            },
          });

          const negative = await RedditComment.count({
            where: {
              listingId: listing.id,
              sentimentAnalysis: SentimentAnalysisStatus.Negative,
            },
          });

          const neutral = await RedditComment.count({
            where: {
              listingId: listing.id,
              sentimentAnalysis: SentimentAnalysisStatus.Neutral,
            },
          });

          const total = positive + negative + neutral;
          if (total === 0) {
            data.push({
              date: listing.date.toLocaleDateString(),
              time: listing.date.toLocaleTimeString('it-IT'),
              positive: 0,
              negative: 0,
              neutral: 0,
            });
          } else {
            data.push({
              date: listing.date.toLocaleDateString(),
              time: listing.date.toLocaleTimeString('it-IT'),
              positive: (positive / total) * 100,
              negative: (negative / total) * 100,
              neutral: (neutral / total) * 100,
            });
          }

        }

        res.send({ data: data });
      } else {
        res.status(404).json({ message: resourceNotFound });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: unknownError });
  }
};

/**
 * Provides the % of comments that are labeled as subjective and objective for media within a specific datetime range
 */
export const getSubjectivityAnalysisForTimeSeries: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: RedditSubreddit,
    });
    if (!user?.subreddit)
      return res.send({
        data: [],
      });
    const startDateParam = req.query.start;
    const endDateParam = req.query.end;
    let startDate: Date;
    let endDate: Date;
    if (startDateParam && endDateParam) {
      if (startDateParam.length === 8 && endDateParam.length === 8) {
        // parse
        [startDate, endDate] = getStartEndDate(
          startDateParam.toString(),
          endDateParam.toString()
        );

        const listingArray = await RedditListing.findAll({
          where: {
            subredditId: user?.subreddit.id,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [['date', 'ASC']],
        });
        const data: any[] = [];

        for (const listing of listingArray) {
          const subjective = await RedditComment.count({
            where: {
              listingId: listing.id,
              subjectivityAnalysis: SubjectivityAnalysis.Subjective,
            },
          });

          const objective = await RedditComment.count({
            where: {
              listingId: listing.id,
              subjectivityAnalysis: SubjectivityAnalysis.Objective,
            },
          });
          const total = subjective + objective;
          if (total === 0) {
            data.push({
              date: listing.date.toLocaleDateString(),
              time: listing.date.toLocaleTimeString('it-IT'),
              subjective: 0,
              objective: 0,
            });
          } else {
            data.push({
              date: listing.date.toLocaleDateString(),
              time: listing.date.toLocaleTimeString('it-IT'),
              subjective: (subjective / total) * 100,
              objective: (objective / total) * 100,
            });
          }

        }

        res.send({ data: data });
      } else {
        res.status(404).json({ message: resourceNotFound });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: unknownError });
  }
};
