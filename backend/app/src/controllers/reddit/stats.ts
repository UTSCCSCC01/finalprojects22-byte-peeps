import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import RedditComment from '../../models/reddit/comment';
import RedditListing from '../../models/reddit/listing';
import RedditSubreddit from '../../models/reddit/subreddit';
import User from '../../models/user/user';

/**
 * Provides the stats for ui cards
 */
export const getRedditStats: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.startDate?.toString();
  const endDateParam = req.query.endDate?.toString();

  const { startDate, endDate } = getDates(startDateParam, endDateParam);

  if (!startDate || !endDate)
    return res.status(400).send(invalidDateRangeResponse);

  const user = await User.findOne({
    where: { username: req.session.username },
    include: RedditSubreddit,
  });

  if (!user?.subreddit)
    return res.send({
      totalListings: null,
      totalComments: null,
      avgScore: null,
    });

  // Get Total Posts here
  const totalListings = await RedditListing.count({
    where: {
      subredditId: user!.subreddit.id,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // Get Total comments
  const totalComments = await RedditComment.count({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: RedditListing,
        where: {
          subredditId: user!.subreddit.id,
        },
      },
    ],
  });

  // Get Average listing score
  const queryResult = (await RedditListing.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      subredditId: user!.subreddit.id,
    },
    attributes: [[Sequelize.fn('avg', Sequelize.col('score')), 'avgScore']],
    raw: true,
  }).then((data) => data[0])) as unknown as {
    avgScore: string;
  };

  const avgScore = parseInt(queryResult.avgScore || '0');

  return res.send({
    totalListings,
    avgScore,
    totalComments,
  });
};
