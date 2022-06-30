import { RequestHandler } from 'express';
import FacebookComment from '../../models/facebook/comment';
import FacebookPost from '../../models/facebook/post';
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
        console.log(startDate, endDate);

        // Get Total comments
        const commentCount = await FacebookComment.count();

        // Get Total likes
        const totalAmount = await FacebookPost.findAll({
          where: {
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          attributes: [
            [Sequelize.fn('sum', Sequelize.col('likes')), 'total_amount'],
          ],
        });

        console.log(commentCount);
        console.log(totalAmount);

        res.send({
          totalComments: commentCount,
          totalAmount,
        });
      } catch (error) {
        res.status(404).send(error);
      }
    }
  } else {
    res.status(404).send('Invalid Date Input');
  }
};
