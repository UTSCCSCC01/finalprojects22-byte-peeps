import { Table, Model, Column, BelongsTo, ForeignKey, AllowNull, Default } from 'sequelize-typescript';
import FacebookPost from './post';

@Table({
  timestamps: false,
  tableName: 'facebook_comments',
})
export default class FacebookComment extends Model {
  @AllowNull(false)
  @Column
  dataId: string

  @AllowNull(false)
  @Column
  userName: string
  
  @AllowNull(false)
  @Column
  message: string

  @Default(0)
  @Column
  likes: number

  @ForeignKey(() => FacebookPost)
  @AllowNull(false)
  @Column
  postId: number

  @BelongsTo(() => FacebookPost)
  post: FacebookPost;
}