import { RequestHandler } from 'express';
const { Op } = require('sequelize');
import {
  invalidDateRangeResponse,
  invalidInput,
  unknownError,
} from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import User from '../../models/user/user';
import YouTubeChannel from '../../models/youtube/channel';
import YoutubeComment from '../../models/youtube/comment';
import YouTubeVideo from '../../models/youtube/video';
import {
  SentimentAnalysisStatus,
  SubjectivityAnalysis,
} from '../../globalHelpers/globalConstants';

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
      include: YouTubeChannel,
    });
    const postId = req.query.postId ?? null;
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const start: string = req.query.startDate.toString();
    const end: string = req.query.endDate.toString();
    const dates = getDates(start, end);

    if (!user?.youtubeChannel) return res.send({ count: 0, data: [] });

    const videos = postId
      ? await YouTubeVideo.findAll({
          where: { channelId: user!.youtubeChannel.id, id: postId },
        })
      : await YouTubeVideo.findAll({
          where: { channelId: user!.youtubeChannel.id },
        });
    const videoIds: number[] = videos.map((v) => v.id);
    const comments = await YoutubeComment.findAll({
      where: {
        videoId: videoIds,
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
    next(e);
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
        subjectivityAnalysis: SubjectivityAnalysis.Subjective,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const objective = await YoutubeComment.count({
      where: {
        videoId: videoIds,
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
        sentimentAnalysis: SentimentAnalysisStatus.Positive,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const neutral = await YoutubeComment.count({
      where: {
        videoId: videoIds,
        sentimentAnalysis: SentimentAnalysisStatus.Neutral,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const negative = await YoutubeComment.count({
      where: {
        videoId: videoIds,
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
