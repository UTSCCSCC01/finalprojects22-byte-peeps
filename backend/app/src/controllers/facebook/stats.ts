import { RequestHandler } from 'express';
import FacebookApi from '../../models/facebook/api';
import FacebookComment from '../../models/facebook/comment';
import FacebookPost from '../../models/facebook/post';
import User from '../../models/user/user';
const { Sequelize, Op } = require('sequelize');
// const Op = Sequelize.Op;

/**
 * Provides the stats for ui cards
 */
export const getStats: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.start;
  const endDateParam = req.query.end;

  let startDate: Date;
  let endDate: Date;

  const user = await User.findOne({
    where: { username: req.session.username },
    include: FacebookApi,
  });

  if (!user?.facebookApi)
    return res.send({ totalComments: null, totalLikes: null });

  if (startDateParam && endDateParam) {
    if (startDateParam.length === 8 && endDateParam.length === 8) {
      // parse
      const year = parseInt(startDateParam.toString().substring(0, 4));
      const month = parseInt(startDateParam.toString().substring(4, 6));
      const day = parseInt(startDateParam.toString().substring(6, 8));

      const year_end = parseInt(endDateParam.toString().substring(0, 4));
      const month_end = parseInt(endDateParam.toString().substring(4, 6));
      const day_end = parseInt(endDateParam.toString().substring(6, 8));

      try {
        startDate = new Date(year, month - 1, day);
        endDate = new Date(year_end, month_end - 1, day_end + 1);

        // Get Total comments
        const commentCount = await FacebookComment.count({
          where: {
            date: {
              [Op.between]: [startDate, endDate],
            },
            userName: req.session.username,
          },
        });

        // Get Total likes
        let totalAmount = await FacebookPost.findAll({
          where: {
            date: {
              [Op.between]: [startDate, endDate],
            },
            apiId: user!.facebookApi.id,
          },
          attributes: [
            [Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes'],
          ],
        });

        let totalLikes = totalAmount.flat(1).slice()[0].toJSON().totalLikes;
        totalLikes = totalLikes === null ? 0 : totalLikes;

        res.send({
          totalComments: commentCount,
          totalLikes,
        });
      } catch (error) {
        res.status(400).send(error);
      }
    }
  } else {
    res.status(400).send('Invalid Date Input');
  }
};
