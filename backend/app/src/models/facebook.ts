import { Table, Model, Column, BelongsTo, HasMany } from 'sequelize-typescript';

export class Facebook {
  posts = Post
  comments = Comment
}

@Table({
  timestamps: false,
  tableName: 'facebook_posts',
})
class Post extends Model {
  @Column
  message!: string

  @HasMany(() => Comment)
  comments!: Comment[];
}

@Table({
  timestamps: false,
  tableName: 'facebook_comments'
})
class Comment extends Model {
  @Column
  message!: string

  @Column
  user_name!: string

  @BelongsTo(() => Post)
  post!: Post;
}
