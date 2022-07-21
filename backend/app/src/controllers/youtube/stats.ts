import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import User from '../../models/user/user';
import YouTubeChannel from '../../models/youtube/channel';
import YouTubeComment from '../../models/youtube/comment';
import YouTubeVideo from '../../models/youtube/video';

/**
 * Provides the stats for ui cards
 */
export const getYoutubeStats: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.startDate?.toString();
  const endDateParam = req.query.endDate?.toString();
  const postId = req.query.postId;

  const { startDate, endDate } = getDates(startDateParam, endDateParam);

  if (!startDate || !endDate)
    return res.status(400).send(invalidDateRangeResponse);

  const user = await User.findOne({
    where: { username: req.session.username },
    include: YouTubeChannel,
  });

  if (!user?.youtubeChannel)
    return res.send({
      totalVideos: null,
      totalViews: null,
      totalLikes: null,
      totalComments: null,
    });

  // Get Total Posts here
  let postsRes = {};
  if (!postId) {
    const totalVideos = await YouTubeVideo.count({
      where: {
        channelId: user!.youtubeChannel.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    postsRes = { totalVideos };
  }

  let postFilter = {};

  // Get Total comments
  if (postId) postFilter = { videoId: postId };
  const totalComments = await YouTubeComment.count({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      ...postFilter,
    },
    include: [
      {
        model: YouTubeVideo,
        where: {
          channelId: user!.youtubeChannel.id,
        },
      },
    ],
  });

  // Get Total Likes and views
  if (postId) postFilter = { id: postId };
  const queryResult = (await YouTubeVideo.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      channelId: user!.youtubeChannel.id,
      ...postFilter,
    },
    attributes: [
      [Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes'],
      [Sequelize.fn('sum', Sequelize.col('views')), 'totalViews'],
    ],
    raw: true,
  }).then((data) => data[0])) as unknown as {
    totalLikes: string;
    totalViews: string;
  };

  const totalLikes = parseInt(queryResult.totalLikes || '0');
  const totalViews = parseInt(queryResult.totalViews || '0');

  return res.send({
    ...postsRes,
    totalViews,
    totalLikes,
    totalComments,
  });
};