import { unknownError } from './../../globalHelpers/globalConstants';
import { RequestHandler } from 'express';
import InstagramMedia from '../../models/instagram/media';
import InstagramComment from '../../models/instagram/comment';
import InstagramApi from "../../models/instagram/api"
import User from '../../models/user/user';
import { resourceNotFound } from '../../globalHelpers/globalConstants';
const { sequelize, Op } = require("sequelize");

/**
 * Provides the 50 most recent Instagram media
 */
export const getMedia: RequestHandler = async (req, res, next) => {
  const comments = await InstagramMedia.findAll({
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
};

/**
 * Provides the % of comments that are labeled as positive, negative and neutral for media within a specific datetime range
 */

export const getSentimentAnalysisForTimeSeries: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.start;
  const endDateParam = req.query.end;
  let startDate: Date;
  let endDate: Date;
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: InstagramApi,
    })
    if (!user?.instagramApi) return res.send({
      data: []

    })
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: unknownError })
  }
  if (startDateParam && endDateParam) {
    if (startDateParam.length === 8 && endDateParam.length === 8) {
      // parse
      const year = parseInt((startDateParam.toString()).substring(0, 4));
      const month = parseInt((startDateParam.toString()).substring(4, 6));
      const day = parseInt((startDateParam.toString()).substring(6, 8));

      const year_end = parseInt((endDateParam.toString()).substring(0, 4));
      const month_end = parseInt((endDateParam.toString()).substring(4, 6));
      const day_end = parseInt((endDateParam.toString()).substring(6, 8));

      startDate = new Date(year, month - 1, day);
      endDate = new Date(year_end, month_end - 1, day_end + 1);
      try {
        const mediaArray = await InstagramMedia.findAll({
          where: {
            date: {
              [Op.between]: [startDate, endDate]
            }
          },
          order: [['date', 'ASC']]
        })
        const data: any[] = []

        for (const media of mediaArray) {

          const positive = await InstagramComment.count({
            where: {
              mediaId: media.id,
              sentimentAnalysis: 'positive'

            },
          });

          const negative = await InstagramComment.count({
            where: {
              mediaId: media.id,
              sentimentAnalysis: 'negative'

            },
          });

          const neutral = await InstagramComment.count({
            where: {
              mediaId: media.id,
              sentimentAnalysis: 'neutral'

            }
          });

          const total = positive + negative + neutral
          data.push({
            date: media.date.toLocaleDateString(),
            time: media.date.toLocaleTimeString('it-IT'),
            positive: positive / total * 100,
            negative: negative / total * 100,
            neutral: neutral / total * 100
          })
        }


        res.send({ data: data })
      } catch (error) {
        console.log(error)
        res.status(404).json({ message: resourceNotFound });
      }
    } else {
      res.status(404).json({ message: resourceNotFound });
    }
  }


}

