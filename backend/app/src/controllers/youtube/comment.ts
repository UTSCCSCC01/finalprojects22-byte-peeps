import { RequestHandler } from 'express';
const { Op } = require('sequelize');
import {
  invalidDateRangeResponse,
  unknownError,
} from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import User from '../../models/user/user';
import YouTubeChannel from '../../models/youtube/channel';
import YoutubeComment from '../../models/youtube/comment';
import YouTubeVideo from '../../models/youtube/video';

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
      return res.status(400).send();

    const user = await User.findOne({
      where: { username: req.session.username },
      include: YouTubeChannel,
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

    if (!user?.youtubeChannel) return res.send({ count: 0, data: [] });

    const videos = await YouTubeVideo.findAll({
      where: { channelId: user!.youtubeChannel.id },
    });
    const videoIds: number[] = videos.map((v) => v.id);
    const comments = await YoutubeComment.findAll({
      where: {
        videoId: videoIds,
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

export const getAllComments: RequestHandler = async (req, res, next) => {
  const allComments: YoutubeComment[] = await YoutubeComment.findAll();
  return res.status(200).json({ data: allComments });
};

export const getCommentById: RequestHandler = async (req, res, next) => {};

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
      include: YouTubeChannel,
    });

    if (!user?.youtubeChannel)
      return res.send({
        positive: 0,
        neutral: 0,
        negative: 0,
      });

    const videos = await YouTubeVideo.findAll({
      where: { channelId: user!.youtubeChannel.id },
    });
    const videoIds: number[] = videos.map((v) => v.id);

    const subjective = await YoutubeComment.count({
      where: {
        videoId: videoIds,
        subjectivityAnalysis: 'subjective',
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const objective = await YoutubeComment.count({
      where: {
        videoId: videoIds,
        subjectivityAnalysis: 'objective',
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

export const getCommentsSentimentAnalysis: RequestHandler = async (
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
      include: YouTubeChannel,
    });

    if (!user?.youtubeChannel)
      return res.send({
        positive: 0,
        neutral: 0,
        negative: 0,
      });

    const videos = await YouTubeVideo.findAll({
      where: { channelId: user!.youtubeChannel.id },
    });
    const videoIds: number[] = videos.map((v) => v.id);

    const positive = await YoutubeComment.count({
      where: {
        videoId: videoIds,
        sentimentAnalysis: 'positive',
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const neutral = await YoutubeComment.count({
      where: {
        videoId: videoIds,
        sentimentAnalysis: 'neutral',
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const negative = await YoutubeComment.count({
      where: {
        videoId: videoIds,
        sentimentAnalysis: 'negative',
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
