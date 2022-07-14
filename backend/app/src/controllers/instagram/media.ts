import { unknownError } from './../../globalHelpers/globalConstants';
import { RequestHandler } from 'express';
import InstagramMedia from '../../models/instagram/media';
import InstagramComment from '../../models/instagram/comment';
import InstagramApi from "../../models/instagram/api"
import User from '../../models/user/user';
import { resourceNotFound } from '../../globalHelpers/globalConstants';
import getStartEndDate from '../helpers/helpers'
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
  console.log('reached instagram sentiment analysis')
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: InstagramApi,
    })
    if (!user?.instagramApi) return res.send({
      data: []

    })
    const startDateParam = req.query.start;
    const endDateParam = req.query.end;
    let startDate: Date;
    let endDate: Date;
    if (startDateParam && endDateParam) {
      if (startDateParam.length === 8 && endDateParam.length === 8) {
        // parse
        [startDate, endDate] = getStartEndDate(startDateParam.toString(), endDateParam.toString())

        const mediaArray = await InstagramMedia.findAll({
          where: {
            apiId: user?.instagramApi.id,
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

      } else {
        res.status(404).json({ message: resourceNotFound });
      }
    }


  } catch (e) {
    console.log(e);
    res.status(500).json({ message: unknownError })
  }
}

