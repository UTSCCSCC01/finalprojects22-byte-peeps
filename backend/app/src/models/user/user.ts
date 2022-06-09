import { Table, Model, Column, AllowNull, HasOne } from 'sequelize-typescript';
import FacebookApi from '../facebook/api';
import InstagramApi from '../instagram/api';
import TwitterUser from '../twitter/user';
import YouTubeChannel from '../youtube/channel';

@Table({
  timestamps: false,
  tableName: 'users',
})
export default class User extends Model {
  @AllowNull(false)
  @Column
  username: string

  @AllowNull(false)
  @Column
  password: string

  @HasOne(() => FacebookApi)
  facebookApi: FacebookApi

  @HasOne(() => InstagramApi)
  instagramApi: InstagramApi

  @HasOne(() => YouTubeChannel)
  youtubeChannel: YouTubeChannel

  @HasOne(() => TwitterUser)
  twitterUser: TwitterUser
}
