import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import TwitterConversation from '../../models/twitter/conversation';
import TwitterTweet from '../../models/twitter/tweet';
import TwitterUser from '../../models/twitter/user';
import User from '../../models/user/user';

/**
 * Provides the stats for ui cards
 */
export const getTwitterStats: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.startDate?.toString();
  const endDateParam = req.query.endDate?.toString();

  const { startDate, endDate } = getDates(startDateParam, endDateParam);

  if (!startDate || !endDate)
    return res.status(400).send(invalidDateRangeResponse);

  const user = await User.findOne({
    where: { username: req.session.username },
    include: TwitterUser,
  });

  if (!user?.twitterUser)
    return res.send({
      totalTweets: null,
      totalLikes: null,
      totalReplies: null,
      totalRetweets: null,
    });

  // Get Total tweets
  const totalTweets = await TwitterTweet.count({
    where: {
      twitterUserId: user!.twitterUser.id,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // Get Total replies for all tweets
  const totalReplies = await TwitterConversation.count({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: TwitterTweet,
        where: {
          twitterUserId: user!.twitterUser.id,
        },
      },
    ],
  });

  // Get Total Likes and retweets for the actual tweets
  const queryResult = (await TwitterTweet.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      twitterUserId: user!.twitterUser.id,
    },
    attributes: [
      [Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes'],
      [Sequelize.fn('sum', Sequelize.col('retweets')), 'totalRetweets'],
    ],
    raw: true,
  }).then((data) => data[0])) as unknown as {
    totalLikes: string;
    totalRetweets: string;
  };

  const totalLikes = parseInt(queryResult.totalLikes || '0');
  const totalRetweets = parseInt(queryResult.totalRetweets || '0');

  return res.send({
    totalTweets,
    totalLikes,
    totalReplies,
    totalRetweets,
  });
};
