import { Table, Model, Column, BelongsTo, HasMany, DataType, ForeignKey, AllowNull } from 'sequelize-typescript';

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
  user_name: string

  @ForeignKey(() => Post)
  @AllowNull(false)
  @Column
  postId: number

  @BelongsTo(() => Post)
  post: Post;
}
