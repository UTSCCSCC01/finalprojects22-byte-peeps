import userModels from './user/models';
import facebookModels from './facebook/models';
import instagramModels from './instagram/models';
import youtubeModels from './youtube/models';
import twitterModels from './twitter/models';
import redditModels from './reddit/models';

const models = [
  ...userModels,
  ...facebookModels,
  ...instagramModels,
  ...youtubeModels,
  ...twitterModels,
  ...redditModels,
];

export default models;
