import { RequestHandler } from 'express';
import {
  resourceNotFound,
  unknownError,
} from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import FacebookApi from '../../models/facebook/api';
import FacebookComment from '../../models/facebook/comment';
import FacebookPost from '../../models/facebook/post';
import User from '../../models/user/user';
import getStartEndDate from '../helpers/helpers';
const { sequelize, Op } = require('sequelize');

/**
 * Provides the id and message of the user's Facebook posts in the specific date range
 */
export const getPosts: RequestHandler = async (req, res, next) => {
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

  const start: string = req.query.startDate.toString();
  const end: string = req.query.endDate.toString();
  const dates = getDates(start, end);

  if (!user?.facebookApi) return res.send({ count: 0, data: [] });

  const posts = await FacebookPost.findAll({
    where: {
      apiId: user!.facebookApi.id,
      date: {
        [Op.between]: [dates.startDate, dates.endDate],
      },
    },
    attributes: ['id', ['message', 'label'], 'date', ['dataId', 'pid']],
  });

  res.send(posts);
};

/**
 * Provides the % of comments that are labeled as positive, negative and neutral for post within a specific datetime range
 */

export const getSentimentAnalysisForTimeSeries: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: FacebookApi,
    });
    if (!user?.facebookApi)
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

        const postArray = await FacebookPost.findAll({
          where: {
            apiId: user!.facebookApi.id,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [['date', 'ASC']],
        });

        const data: any[] = [];

        for (const post of postArray) {
          const positive = await FacebookComment.count({
            where: {
              postId: post.id,
              sentimentAnalysis: 'positive',
            },
          });

          const negative = await FacebookComment.count({
            where: {
              postId: post.id,
              sentimentAnalysis: 'negative',
            },
          });

          const neutral = await FacebookComment.count({
            where: {
              postId: post.id,
              sentimentAnalysis: 'neutral',
            },
          });

          const total = positive + negative + neutral;
          data.push({
            date: post.date.toLocaleDateString(),
            time: post.date.toLocaleTimeString('it-IT'),
            positive: (positive / total) * 100,
            negative: (negative / total) * 100,
            neutral: (neutral / total) * 100,
          });
        }

        res.send({ data: data });
      } else {
        res.status(404).json({ message: resourceNotFound });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: resourceNotFound });
  }
};
