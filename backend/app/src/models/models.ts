import userModels from './user/models';
import facebookModels from './facebook/models';
import instagramModels from './instagram/models';
import youtubeModels from './youtube/models';
import twitterModels from './twitter/models';
import redditModels from './reddit/models';
import yelpModels from './yelp/models';
import googleReviewsModels from './googleReviews/models';

const models = [
  ...userModels,
  ...facebookModels,
  ...instagramModels,
  ...youtubeModels,
  ...twitterModels,
  ...redditModels,
  ...yelpModels,
  ...googleReviewsModels,
];

export default models;
