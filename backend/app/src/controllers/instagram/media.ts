import {
  unknownError, SentimentAnalysisStatus,
  SubjectivityAnalysis,
} from './../../globalHelpers/globalConstants';
import { RequestHandler } from 'express';
import InstagramMedia from '../../models/instagram/media';
import InstagramComment from '../../models/instagram/comment';
import InstagramApi from '../../models/instagram/api';
import User from '../../models/user/user';
import { resourceNotFound } from '../../globalHelpers/globalConstants';
import getStartEndDate from '../helpers/helpers';
import { getDates } from '../../globalHelpers/globalHelpers';
const { sequelize, Op } = require('sequelize');

/**
 * Provides the id and message of the user's Instagram media in the specific date range
 */
export const getMedia: RequestHandler = async (req, res, next) => {
  if (
    !req.query.startDate ||
    req.query.startDate.length !== 8 ||
    !req.query.endDate ||
    req.query.endDate.length !== 8
  )
    return res.status(400).send();

  const user = await User.findOne({
    where: { username: req.session.username },
    include: InstagramApi,
  });

  const start: string = req.query.startDate.toString();
  const end: string = req.query.endDate.toString();
  const dates = getDates(start, end);

  if (!user?.instagramApi) return res.send({ count: 0, data: [] });

  const media = await InstagramMedia.findAll({
    where: {
      apiId: user!.instagramApi.id,
      date: {
        [Op.between]: [dates.startDate, dates.endDate],
      },
    },
    attributes: ['id', ['caption', 'label'], 'date', ['dataId', 'pid']],
  });

  res.send(media);
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
      include: InstagramApi,
    });
    if (!user?.instagramApi)
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

        const mediaArray = await InstagramMedia.findAll({
          where: {
            apiId: user?.instagramApi.id,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [['date', 'ASC']],
        });
        const data: any[] = [];

        for (const media of mediaArray) {
          const positive = await InstagramComment.count({
            where: {
              mediaId: media.id,
              sentimentAnalysis: SentimentAnalysisStatus.Positive,
            },
          });

          const negative = await InstagramComment.count({
            where: {
              mediaId: media.id,
              sentimentAnalysis: SentimentAnalysisStatus.Negative,
            },
          });

          const neutral = await InstagramComment.count({
            where: {
              mediaId: media.id,
              sentimentAnalysis: SentimentAnalysisStatus.Neutral,
            },
          });

          const total = positive + negative + neutral;
          data.push({
            date: media.date.toLocaleDateString(),
            time: media.date.toLocaleTimeString('it-IT'),
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
      include: InstagramApi,
    });
    if (!user?.instagramApi)
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

        const mediaArray = await InstagramMedia.findAll({
          where: {
            apiId: user?.instagramApi.id,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [['date', 'ASC']],
        });
        const data: any[] = [];

        for (const media of mediaArray) {
          const subjective = await InstagramComment.count({
            where: {
              mediaId: media.id,
              subjectivityAnalysis: SubjectivityAnalysis.Subjective,
            },
          });

          const objective = await InstagramComment.count({
            where: {
              mediaId: media.id,
              subjectivityAnalysis: SubjectivityAnalysis.Objective,
            },
          });


          const total = subjective + objective;
          data.push({
            date: media.date.toLocaleDateString(),
            time: media.date.toLocaleTimeString('it-IT'),
            subjective: (subjective / total) * 100,
            objective: (objective / total) * 100,
          });
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

