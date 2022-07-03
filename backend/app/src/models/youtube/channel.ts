import {
  AllowNull,
  BelongsTo,
  Column,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import User from '../user/user';
import YouTubeVideo from './video';

@Table({
  timestamps: false,
  tableName: 'youtube_channels',
})
export default class YouTubeChannel extends Model {
  @AllowNull(false)
  @Column
  channelId: string;

  @AllowNull(false)
  @Column
  name: string;

  @Column
  isActive: boolean;

  @Column
  oauth: string;

  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => YouTubeVideo)
  posts: YouTubeVideo[];
}
