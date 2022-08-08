import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import YouTubeChannel from './channel';
import YouTubeComment from './comment';

@Table({
  tableName: 'youtube_videos',
  indexes: [
    {
      name: 'youtube_videos_channel_id_index',
      unique: true,
      fields: ['resourceId', 'channelId'],
    },
  ],
})
export default class YouTubeVideo extends Model {
  @AllowNull(false)
  @Column
  resourceId: string;

  @AllowNull
  @Column
  date: Date;

  @AllowNull(false)
  @Column
  title: string;

  @Default(0)
  @Column
  views: number;

  @Default(0)
  @Column
  likes: number;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => YouTubeChannel)
  @AllowNull(false)
  @Column
  channelId: number;

  @BelongsTo(() => YouTubeChannel)
  channel: YouTubeChannel;

  @HasMany(() => YouTubeComment)
  comments: YouTubeComment[];
}
