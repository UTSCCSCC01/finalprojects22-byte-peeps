import { Table, Model, Column, BelongsTo, HasMany, ForeignKey, AllowNull } from 'sequelize-typescript';
import { User } from './user';
import * as Facebook from './facebook';

@Table({
  timestamps: false,
  tableName: 'instagram_apis',
})
export class Api extends Model {
  @ForeignKey(() => Facebook.Api)
  @AllowNull(false)
  @Column
  facebookApiId: number

  @BelongsTo(() => Facebook.Api)
  facebookApi: Facebook.Api;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User

  @HasMany(() => Media)
  media: Media
}

@Table({
  timestamps: false,
  tableName: 'instagram_media',
})
export class Media extends Model {
  @AllowNull(false)
  @Column
  message: string

  @HasMany(() => Comment)
  comments: Comment[];

  @ForeignKey(() => Api)
  @AllowNull(false)
  @Column
  apiId: number

  @BelongsTo(() => Api)
  api: Api;
}

@Table({
  timestamps: false,
  tableName: 'instagram_comments',
})
export class Comment extends Model {
  @AllowNull(false)
  @Column
  userName: string

  @AllowNull(false)
  @Column
  message: string

  @ForeignKey(() => Media)
  @AllowNull(false)
  @Column
  mediaId: number

  @BelongsTo(() => Media)
  media: Media;
}
