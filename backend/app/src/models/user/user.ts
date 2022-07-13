import {
  Table,
  Model,
  Column,
  AllowNull,
  HasOne,
  DeletedAt,
} from 'sequelize-typescript';
import FacebookApi from '../facebook/api';
import InstagramApi from '../instagram/api';
import RedditSubreddit from '../reddit/subreddit';
import TwitterUser from '../twitter/user';
import YouTubeChannel from '../youtube/channel';
import YelpBusiness from '../yelp/business';

@Table({
  tableName: 'users',
})
export default class User extends Model {
  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @DeletedAt
  deletedAt: Date;

  @HasOne(() => FacebookApi)
  facebookApi: FacebookApi;

  @HasOne(() => InstagramApi)
  instagramApi: InstagramApi;

  @HasOne(() => YouTubeChannel)
  youtubeChannel: YouTubeChannel;

  @HasOne(() => TwitterUser)
  twitterUser: TwitterUser;

  @HasOne(() => RedditSubreddit)
  subreddit: RedditSubreddit;

  @HasOne(() => YelpBusiness)
  yelpBusiness: YelpBusiness;
}
