import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import FacebookApi from '../../models/facebook/api';
import FacebookPost from '../../models/facebook/post';
import GoogleReviewsAccount from '../../models/googleReviews/account';
import GoogleReviewsLocation from '../../models/googleReviews/location';
import GoogleReviewsReview from '../../models/googleReviews/review';
import InstagramApi from '../../models/instagram/api';
import InstagramMedia from '../../models/instagram/media';
import InstagramTag from '../../models/instagram/tag';
import RedditListing from '../../models/reddit/listing';
import RedditSubreddit from '../../models/reddit/subreddit';
import TwitterTweet from '../../models/twitter/tweet';
import TwitterUser from '../../models/twitter/user';
import User from '../../models/user/user';
import YelpBusiness from '../../models/yelp/business';
import YelpReview from '../../models/yelp/review';
import YouTubeChannel from '../../models/youtube/channel';
import YouTubeVideo from '../../models/youtube/video';

export const getOverviewStats: RequestHandler = async (req, res, next) => {
  const startDateParam = req.query.startDate?.toString();
  const endDateParam = req.query.endDate?.toString();

  const { startDate, endDate } = getDates(startDateParam, endDateParam);

  if (!startDate || !endDate)
    return res.status(400).send(invalidDateRangeResponse);

  const user = await User.findOne({
    where: { username: req.session.username },
    include: [
      FacebookApi,
      InstagramApi,
      RedditSubreddit,
      TwitterUser,
      YouTubeChannel,
      GoogleReviewsAccount,
      YelpBusiness,
    ],
  });

  //total posts
  let totalPosts = 0;
  let totalLikes = 0;
  let totalMentions = 0;
  let avgReviewSum = 0;
  let avgReviewCount = 0;

  if (user?.facebookApi) {
    const fbPosts = await FacebookPost.count({
      where: {
        apiId: user!.facebookApi.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    totalPosts += fbPosts;

    let totalReactions = 0;

    let fbQueryResult = await FacebookPost.findAll({
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

    Object.values(fbQueryResult).forEach((value) => {
      totalReactions += parseInt(value || '0');
    });

    totalLikes += totalReactions;
  }

  if (user?.instagramApi) {
    const igPosts = await InstagramMedia.count({
      where: {
        apiId: user!.instagramApi.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    totalPosts += igPosts;

    const igQueryResult = (await InstagramMedia.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        apiId: user!.instagramApi.id,
      },
      attributes: [[Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes']],
      raw: true,
    }).then((data) => data[0])) as unknown as { totalLikes: string };

    totalLikes += parseInt(igQueryResult.totalLikes || '0');

    const igTags = await InstagramTag.count({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        apiId: user!.instagramApi.id,
      },
    });

    totalMentions += igTags;
  }

  if (user?.subreddit) {
    const redditListings = await RedditListing.count({
      where: {
        subredditId: user!.subreddit.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    totalPosts += redditListings;
  }

  if (user?.twitterUser) {
    const tweets = await TwitterTweet.count({
      where: {
        twitterUserId: user!.twitterUser.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    totalPosts += tweets;

    const twtQueryResult = (await TwitterTweet.findAll({
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

    totalLikes += parseInt(twtQueryResult.totalLikes || '0');
    totalMentions += parseInt(twtQueryResult.totalRetweets || '0');
  }

  if (user?.youtubeChannel) {
    const totalVideos = await YouTubeVideo.count({
      where: {
        channelId: user!.youtubeChannel.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    totalPosts += totalVideos;

    const queryResult = (await YouTubeVideo.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        channelId: user!.youtubeChannel.id,
      },
      attributes: [[Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes']],
      raw: true,
    }).then((data) => data[0])) as unknown as {
      totalLikes: string;
    };

    totalLikes += parseInt(queryResult.totalLikes || '0');
  }

  //average rating

  if (user?.googleReviewAccount) {
    const grQueryResult = (await GoogleReviewsReview.findAll({
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
      attributes: [[Sequelize.fn('avg', Sequelize.col('rating')), 'avgReview']],
      raw: true,
    }).then((data) => data[0])) as unknown as {
      avgReview: string;
    };

    avgReviewSum += parseInt(grQueryResult.avgReview || '0');
    avgReviewCount += 1;
  }

  if (user?.yelpBusiness) {
    const yelpQueryResult = (await YelpReview.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        businessId: user!.yelpBusiness.id,
      },
      attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgReview']],
      raw: true,
    }).then((data) => data[0])) as unknown as {
      avgReview: string;
    };

    avgReviewSum += parseInt(yelpQueryResult.avgReview || '0');
    avgReviewCount += 1;
  }

  const avgReview = avgReviewSum ? avgReviewSum / avgReviewCount : 0;

  return res.send({
    totalPosts,
    totalLikes,
    totalMentions,
    avgReview,
  });
};
