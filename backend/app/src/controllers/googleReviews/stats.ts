import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import GoogleReviewsAccount from '../../models/googleReviews/account';
import GoogleReviewsLocation from '../../models/googleReviews/location';
import GoogleReviewsReview from '../../models/googleReviews/review';
import User from '../../models/user/user';

/**
 * Provides the stats for ui cards
 */
export const getGoogleReviewsStats: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.startDate?.toString();
  const endDateParam = req.query.endDate?.toString();

  const { startDate, endDate } = getDates(startDateParam, endDateParam);

  if (!startDate || !endDate)
    return res.status(400).send(invalidDateRangeResponse);

  const user = await User.findOne({
    where: { username: req.session.username },
    include: GoogleReviewsAccount,
  });

  if (!user?.googleReviewAccount)
    return res.send({
      totalReviews: null,
      avgReview: null,
    });

  const queryResult = (await GoogleReviewsReview.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: GoogleReviewsLocation,
        attributes: [],
        where: {
          accountId: user!.googleReviewAccount.id,
        },
      },
    ],
    attributes: [
      [Sequelize.fn('count', Sequelize.col('rating')), 'totalReviews'],
      [Sequelize.fn('avg', Sequelize.col('rating')), 'avgReview'],
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
