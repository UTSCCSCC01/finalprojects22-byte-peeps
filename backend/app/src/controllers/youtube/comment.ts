import { RequestHandler } from 'express';
const { Op } = require('sequelize');
import { unknownError } from '../../globalHelpers/globalConstants';
import User from '../../models/user/user';
import YouTubeChannel from '../../models/youtube/channel';
import YoutubeComment from '../../models/youtube/comment';
import YouTubeVideo from '../../models/youtube/video';
import { keywordExtraction } from '../../middlewares/keywordExtraction';

export const createComment: RequestHandler = async (req, res, next) => {};

export const deleteComment: RequestHandler = async (req, res, next) => {};

export const getAllComments: RequestHandler = async (req, res, next) => {
  const allComments: YoutubeComment[] = await YoutubeComment.findAll();
  return res.status(200).json({ data: allComments });
};

export const getCommentById: RequestHandler = async (req, res, next) => {};

export const getWordCloudData: RequestHandler = async (req, res, next) => {
  try {
    if (
      !req.query.startDate ||
      req.query.startDate.length !== 8 ||
      !req.query.endDate ||
      req.query.endDate.length !== 8
    )
      return res.status(400).send({ message: 'Invalid Data Input' });

    const user = await User.findOne({
      where: { username: req.session.username },
      include: YouTubeChannel,
    });
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

    if (!user?.youtubeChannel) return res.send({ data: [] });

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
      attributes: ['message'],
    });
    function getText(acc: string, comment: { message: string }) {
      return acc.concat(' ', comment.message);
    }
    const getKeywords = comments.reduce(getText, ' ');
    res.send({ data: keywordExtraction(getKeywords) });
  } catch (e) {
    console.log(e);
    next(e);
    res.status(500).json({ message: unknownError });
  }
};
