import { Table, Model, Column, AllowNull, HasOne } from 'sequelize-typescript';
import FacebookApi from '../facebook/api';
import InstagramApi from '../instagram/api';
import YouTubeChannel from '../youtube/channel';

@Table({
  timestamps: false,
  tableName: 'users',
})
export default class User extends Model {
  @AllowNull(false)
  @Column
  name: string

  @HasOne(() => FacebookApi)
  facebookApi: FacebookApi

  @HasOne(() => FacebookApi)
  instagramApi: InstagramApi

  @HasOne(() => YouTubeChannel)
  youtubeChannel: YouTubeChannel
}
