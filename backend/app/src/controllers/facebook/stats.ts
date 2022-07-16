import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import FacebookApi from '../../models/facebook/api';
import FacebookComment from '../../models/facebook/comment';
import FacebookPost from '../../models/facebook/post';
import User from '../../models/user/user';

/**
 * Provides the stats for ui cards
 */
export const getFacebookStats: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.startDate?.toString();
  const endDateParam = req.query.endDate?.toString();

  const { startDate, endDate } = getDates(startDateParam, endDateParam);

  if (!startDate || !endDate)
    return res.status(400).send(invalidDateRangeResponse);

  const user = await User.findOne({
    where: { username: req.session.username },
    include: FacebookApi,
  });

  if (!user?.facebookApi)
    return res.send({
      totalPosts: null,
      totalReactions: null,
      totalComments: null,
    });

  // Get Total Posts here
  const totalPosts = await FacebookPost.count({
    where: {
      apiId: user!.facebookApi.id,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // Get Total comments
  const totalComments = await FacebookComment.count({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: FacebookPost,
        where: {
          apiId: user!.facebookApi.id,
        },
      },
    ],
  });

  // Get Total Reactions
  let queryResult = await FacebookPost.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      apiId: user!.facebookApi.id,
    },
    attributes: [
      [Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes'],
      [Sequelize.fn('sum', Sequelize.col('loves')), 'totalLoves'],
      [Sequelize.fn('sum', Sequelize.col('cares')), 'totalCares'],
      [Sequelize.fn('sum', Sequelize.col('hahas')), 'totalHahas'],
      [Sequelize.fn('sum', Sequelize.col('wows')), 'totalWows'],
      [Sequelize.fn('sum', Sequelize.col('sads')), 'totalSads'],
      [Sequelize.fn('sum', Sequelize.col('angrys')), 'totalAngrys'],
    ],
    raw: true,
  }).then((data) => data[0]);

  let totalReactions = 0;

  Object.values(queryResult).forEach((value) => {
    totalReactions += parseInt(value || '0');
  });

  return res.send({
    totalPosts,
    totalReactions: totalReactions,
    totalComments,
  });
};
