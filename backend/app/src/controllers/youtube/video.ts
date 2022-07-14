import { RequestHandler } from 'express';
const { sequelize, Op } = require("sequelize");
import { resourceNotFound, unknownError } from '../../globalHelpers/globalConstants';
import User from '../../models/user/user';
import YouTubeChannel from '../../models/youtube/channel';
import YouTubeComment from '../../models/youtube/comment';
import YouTubeVideo from '../../models/youtube/video';
import getStartEndDate from '../helpers/helpers';

export const getAllVideos: RequestHandler = async (req, res, next) => {

  const allVideos: YouTubeVideo[] = await YouTubeVideo.findAll();
  return res.status(200).json({ data: allVideos });
};

export const getVideoById: RequestHandler = async (req, res, next) => { };

export const getSentimentAnalysisForTimeSeries: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: YouTubeChannel,
    })
    if (!user?.youtubeChannel) return res.send({
      data: []
    })

    const startDateParam = req.query.start;
    const endDateParam = req.query.end;
    let startDate: Date;
    let endDate: Date;
    if (startDateParam && endDateParam) {
      if (startDateParam.length === 8 && endDateParam.length === 8) {
        [startDate, endDate] = getStartEndDate(startDateParam.toString(), endDateParam.toString())

        const videoArray = await YouTubeVideo.findAll({
          where: {
            channelId: user?.youtubeChannel.id,
            date: {
              [Op.between]: [startDate, endDate]
            }
          },
          order: [['date', 'ASC']]
        })

        const data: any[] = []

        for (const video of videoArray) {
          const positive = await YouTubeComment.count({
            where: {
              videoId: video.id,
              sentimentAnalysis: 'positive'
            },
          });
          const negative = await YouTubeComment.count({
            where: {
              videoId: video.id,
              sentimentAnalysis: 'negative'
            },
          });
          const neutral = await YouTubeComment.count({
            where: {
              videoId: video.id,
              sentimentAnalysis: 'neutral'

            },
          });
          const total = positive + negative + neutral
          data.push({
            date: video.date.toLocaleDateString(),
            time: video.date.toLocaleTimeString('it-IT'),
            positive: positive / total * 100,
            negative: negative / total * 100,
            neutral: neutral / total * 100
          })
        }
        res.send({ data: data })

      } else {
        res.status(404).json({ message: resourceNotFound });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: unknownError })
  }
}