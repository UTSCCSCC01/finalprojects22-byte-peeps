import { Table, Model, Column, BelongsTo, ForeignKey, AllowNull } from 'sequelize-typescript';
import FacebookPost from './post';

@Table({
  timestamps: false,
  tableName: 'facebook_comments',
})
export default class FacebookComment extends Model {
  @AllowNull(false)
  @Column
  userName: string
  
  @AllowNull(false)
  @Column
  message: string

  @ForeignKey(() => FacebookPost)
  @AllowNull(false)
  @Column
  postId: number

  @BelongsTo(() => FacebookPost)
  post: FacebookPost;
}