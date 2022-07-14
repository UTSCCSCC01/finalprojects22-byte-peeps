import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import InstagramApi from '../../models/instagram/api';
import InstagramComment from '../../models/instagram/comment';
import InstagramMedia from '../../models/instagram/media';
import InstagramTag from '../../models/instagram/tag';
import User from '../../models/user/user';

/**
 * Provides the stats for ui cards
 */
export const getInstagramStats: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.startDate?.toString();
  const endDateParam = req.query.endDate?.toString();

  const { startDate, endDate } = getDates(startDateParam, endDateParam);

  if (!startDate || !endDate)
    return res.status(400).send(invalidDateRangeResponse);

  const user = await User.findOne({
    where: { username: req.session.username },
    include: InstagramApi,
  });

  if (!user?.instagramApi)
    return res.send({
      totalPosts: null,
      totalLikes: null,
      totalComments: null,
      totalTags: null,
    });

  // Get Total Posts here
  const totalPosts = await InstagramMedia.count({
    where: {
      apiId: user!.instagramApi.id,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // Get Total comments
  const totalComments = await InstagramComment.count({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: InstagramMedia,
        where: {
          apiId: user!.instagramApi.id,
        },
      },
    ],
  });

  // Get Total Likes
  const queryResult = (await InstagramMedia.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      apiId: user!.instagramApi.id,
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes']],
    raw: true,
  }).then((data) => data[0])) as unknown as { totalLikes: string };

  const totalLikes = parseInt(queryResult.totalLikes || '0');

  // Get Total Tags
  const totalTags = await InstagramTag.count({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      apiId: user!.instagramApi.id,
    },
  });

  return res.send({
    totalPosts,
    totalLikes,
    totalComments,
    totalTags,
  });
};
