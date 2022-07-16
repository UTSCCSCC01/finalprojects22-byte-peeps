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
  Unique,
} from 'sequelize-typescript';
import YouTubeChannel from './channel';
import YouTubeComment from './comment';

@Table({
  tableName: 'youtube_videos',
})
export default class YouTubeVideo extends Model {
  @AllowNull(false)
  @Unique
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
