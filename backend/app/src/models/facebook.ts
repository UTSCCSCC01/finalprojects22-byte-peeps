import { Table, Model, Column, BelongsTo, HasMany, ForeignKey, AllowNull } from 'sequelize-typescript';
import { User } from './user';

@Table({
  timestamps: false,
  tableName: 'facebook_apis',
})
export class Api extends Model {
  @Column
  @AllowNull(false)
  token: string

  @Column
  isActive: boolean

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Post)
  posts: Post
}

@Table({
  timestamps: false,
  tableName: 'facebook_posts',
})
export class Post extends Model {
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
  tableName: 'facebook_comments',
})
export class Comment extends Model {
  @AllowNull(false)
  @Column
  message: string

  @AllowNull(false)
  @Column
  userName: string

  @ForeignKey(() => Post)
  @AllowNull(false)
  @Column
  postId: number

  @BelongsTo(() => Post)
  post: Post;
}
