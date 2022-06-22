import { AllowNull, BelongsTo, Column, DataType, Default, DeletedAt, ForeignKey, Model, Table } from "sequelize-typescript";
import InstagramMedia from "./media";

@Table({
  tableName: 'instagram_comments',
})
export default class InstagramComment extends Model {
  @AllowNull(false)
  @Column
  dataId: string
  
  @AllowNull(false)
  @Column
  userName: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  message: string

  @AllowNull
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

  @ForeignKey(() => InstagramMedia)
  @AllowNull(false)
  @Column
  mediaId: number

  @BelongsTo(() => InstagramMedia)
  media: InstagramMedia;
}