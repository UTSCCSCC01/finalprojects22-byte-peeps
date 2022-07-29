import { RequestHandler } from 'express';
const { sequelize, Op } = require('sequelize');
import {
  resourceNotFound,
  unknownError,
  SentimentAnalysisStatus,
  SubjectivityAnalysis,
} from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import User from '../../models/user/user';
import YouTubeChannel from '../../models/youtube/channel';
import YouTubeComment from '../../models/youtube/comment';
import YouTubeVideo from '../../models/youtube/video';
import getStartEndDate from '../helpers/helpers';
/**
 * Provides the id and title of the user's YouTube videos in the specific date range
 */
export const getVideos: RequestHandler = async (req, res, next) => {
  if (
    !req.query.startDate ||
    req.query.startDate.length !== 8 ||
    !req.query.endDate ||
    req.query.endDate.length !== 8
  )
    return res.status(400).send();

  const user = await User.findOne({
    where: { username: req.session.username },
    include: YouTubeChannel,
  });

  const start: string = req.query.startDate.toString();
  const end: string = req.query.endDate.toString();
  const dates = getDates(start, end);

  if (!user?.youtubeChannel) return res.send({ count: 0, data: [] });

  const posts = await YouTubeVideo.findAll({
    where: {
      channelId: user!.youtubeChannel.id,
      date: {
        [Op.between]: [dates.startDate, dates.endDate],
      },
    },
    attributes: ['id', ['title', 'label'], 'date', ['resourceId', 'pid']],
  });

  res.send(posts);
};

export const getVideoById: RequestHandler = async (req, res, next) => { };

export const getSentimentAnalysisForTimeSeries: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: YouTubeChannel,
    });
    if (!user?.youtubeChannel)
      return res.send({
        data: [],
      });

    const startDateParam = req.query.start;
    const endDateParam = req.query.end;
    let startDate: Date;
    let endDate: Date;
    if (startDateParam && endDateParam) {
      if (startDateParam.length === 8 && endDateParam.length === 8) {
        [startDate, endDate] = getStartEndDate(
          startDateParam.toString(),
          endDateParam.toString()
        );

        const videoArray = await YouTubeVideo.findAll({
          where: {
            channelId: user?.youtubeChannel.id,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [['date', 'ASC']],
        });

        const data: any[] = [];

        for (const video of videoArray) {
          const positive = await YouTubeComment.count({
            where: {
              videoId: video.id,
              sentimentAnalysis: SentimentAnalysisStatus.Positive,
            },
          });
          const negative = await YouTubeComment.count({
            where: {
              videoId: video.id,
              sentimentAnalysis: SentimentAnalysisStatus.Negative,
            },
          });
          const neutral = await YouTubeComment.count({
            where: {
              videoId: video.id,
              sentimentAnalysis: SentimentAnalysisStatus.Neutral,
            },
          });
          const total = positive + negative + neutral;
          data.push({
            date: video.date.toLocaleDateString(),
            time: video.date.toLocaleTimeString('it-IT'),
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

export const getSubjectivityAnalysisForTimeSeries: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: YouTubeChannel,
    });
    if (!user?.youtubeChannel)
      return res.send({
        data: [],
      });

    const startDateParam = req.query.start;
    const endDateParam = req.query.end;
    let startDate: Date;
    let endDate: Date;
    if (startDateParam && endDateParam) {
      if (startDateParam.length === 8 && endDateParam.length === 8) {
        [startDate, endDate] = getStartEndDate(
          startDateParam.toString(),
          endDateParam.toString()
        );

        const videoArray = await YouTubeVideo.findAll({
          where: {
            channelId: user?.youtubeChannel.id,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [['date', 'ASC']],
        });

        const data: any[] = [];

        for (const video of videoArray) {
          const subjective = await YouTubeComment.count({
            where: {
              videoId: video.id,
              subjectivityAnalysis: SubjectivityAnalysis.Subjective,
            },
          });
          const objective = await YouTubeComment.count({
            where: {
              videoId: video.id,
              subjectivityAnalysis: SubjectivityAnalysis.Objective,
            },
          });

          const total = subjective + objective;
          data.push({
            date: video.date.toLocaleDateString(),
            time: video.date.toLocaleTimeString('it-IT'),
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

