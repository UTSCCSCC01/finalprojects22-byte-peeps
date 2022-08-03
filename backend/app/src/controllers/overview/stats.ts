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
  const postId = req.query.postId;

  const { startDate, endDate } = getDates(startDateParam, endDateParam);

  if (!startDate || !endDate)
    return res.status(400).send(invalidDateRangeResponse);

  const igUser = await User.findOne({
    where: { username: req.session.username },
    include: InstagramApi,
  });
  const fbUser = await User.findOne({
    where: { username: req.session.username },
    include: FacebookApi,
  });
  const redditUser = await User.findOne({
    where: { username: req.session.username },
    include: RedditSubreddit,
  });
  const twtUser = await User.findOne({
    where: { username: req.session.username },
    include: TwitterUser,
  });
  const ytUser = await User.findOne({
    where: { username: req.session.username },
    include: YouTubeChannel,
  });
  const grUser = await User.findOne({
    where: { username: req.session.username },
    include: GoogleReviewsAccount,
  });
  const yelpUser = await User.findOne({
    where: { username: req.session.username },
    include: YelpBusiness,
  });

  //total posts
  let totalPosts = 0;
  if (!postId) {
    const fbPosts = await FacebookPost.count({
      where: {
        apiId: fbUser!.facebookApi.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    totalPosts += fbPosts;
  }

  if (!postId) {
    const igPosts = await InstagramMedia.count({
      where: {
        apiId: igUser!.instagramApi.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    totalPosts += igPosts;
  }

  if (!postId) {
    const redditListings = await RedditListing.count({
      where: {
        subredditId: redditUser!.subreddit.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    totalPosts += redditListings;
  }
  if (!postId) {
    const tweets = await TwitterTweet.count({
      where: {
        twitterUserId: twtUser!.twitterUser.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    totalPosts += tweets;
  }
  if (!postId) {
    const totalVideos = await YouTubeVideo.count({
      where: {
        channelId: ytUser!.youtubeChannel.id,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    totalPosts += totalVideos;
  }

  //   totalPosts = { postSum };

  //total likes
  let totalLikes = 0;
  let postFilter = {};
  //facebook
  if (postId) postFilter = { id: postId };
  let fbQueryResult = await FacebookPost.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      apiId: fbUser!.facebookApi.id,
      ...postFilter,
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

  Object.values(fbQueryResult).forEach((value) => {
    totalReactions += parseInt(value || '0');
  });
  //instagram
  if (postId) postFilter = { id: postId };
  const igQueryResult = (await InstagramMedia.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      apiId: igUser!.instagramApi.id,
      ...postFilter,
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes']],
    raw: true,
  }).then((data) => data[0])) as unknown as { totalLikes: string };

  const igLikes = parseInt(igQueryResult.totalLikes || '0');
  //twitter
  if (postId) postFilter = { id: postId };
  const twtQueryResult = (await TwitterTweet.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      twitterUserId: twtUser!.twitterUser.id,
      ...postFilter,
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

  const twtLikes = parseInt(twtQueryResult.totalLikes || '0');
  const retweets = parseInt(twtQueryResult.totalRetweets || '0'); //used later in mentions

  //youtube

  if (postId) postFilter = { id: postId };
  const queryResult = (await YouTubeVideo.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      channelId: ytUser!.youtubeChannel.id,
      ...postFilter,
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('likes')), 'totalLikes']],
    raw: true,
  }).then((data) => data[0])) as unknown as {
    totalLikes: string;
  };

  const ytLikes = parseInt(queryResult.totalLikes || '0');

  totalLikes = totalReactions + igLikes + twtLikes + ytLikes;

  //total mentions
  let totalMentions = 0;
  if (!postId) {
    const igTags = await InstagramTag.count({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        apiId: igUser!.instagramApi.id,
      },
    });
    totalMentions += igTags;
  }
  totalMentions += retweets;

  //average rating
  let avgReview = 0;
  //google

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
          accountId: grUser!.googleReviewAccount.id,
        },
      },
    ],
    attributes: [[Sequelize.fn('avg', Sequelize.col('rating')), 'avgReview']],
    raw: true,
  }).then((data) => data[0])) as unknown as {
    avgReview: string;
  };
  const grAvg = parseInt(grQueryResult.avgReview || '0');
  //yelp
  const yelpQueryResult = (await YelpReview.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      businessId: yelpUser!.yelpBusiness.id,
    },
    attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgReview']],
    raw: true,
  }).then((data) => data[0])) as unknown as {
    avgReview: string;
  };
  const yelpAvg = parseInt(yelpQueryResult.avgReview || '0');

  avgReview = (grAvg + yelpAvg) / 2;

  return res.send({
    totalPosts,
    totalLikes,
    totalMentions,
    avgReview,
  });
};
