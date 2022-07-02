import { Table, Model, Column, BelongsTo, ForeignKey, AllowNull, Default, DeletedAt } from 'sequelize-typescript';
import FacebookPost from './post';

@Table({
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

  @AllowNull(false)
  @Column
  date: Date

  @Default(0)
  @Column
  likes: number

  @Column
  sentimentAnalysis: string

  @Column
  topicClassification: string

  @Column
  subjectivityAnalysis: string

  @DeletedAt
  deletedAt: Date

  @ForeignKey(() => FacebookPost)
  @AllowNull(false)
  @Column
  postId: number

  @BelongsTo(() => FacebookPost)
  post: FacebookPost;
}