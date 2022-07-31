import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import User from '../../models/user/user';
import YelpBusiness from '../../models/yelp/business';
import YelpReview from '../../models/yelp/review';

/**
 * Provides the stats for ui cards
 */
export const getYelpStats: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.startDate?.toString();
  const endDateParam = req.query.endDate?.toString();

  const { startDate, endDate } = getDates(startDateParam, endDateParam);

  if (!startDate || !endDate)
    return res.status(400).send(invalidDateRangeResponse);

  const user = await User.findOne({
    where: { username: req.session.username },
    include: YelpBusiness,
  });

  if (!user?.yelpBusiness)
    return res.send({
      totalReviews: null,
      avgReview: null,
    });

  const queryResult = (await YelpReview.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      businessId: user!.yelpBusiness.id,
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('rating')), 'totalReviews'],
      [Sequelize.fn('AVG', Sequelize.col('rating')), 'avgReview'],
    ],
    raw: true,
  }).then((data) => data[0])) as unknown as {
    totalReviews: string;
    avgReview: string;
  };

  const totalReviews = parseInt(queryResult.totalReviews || '0');
  const avgReview = parseInt(queryResult.avgReview || '0');

  return res.send({
    totalReviews,
    avgReview,
  });
};
