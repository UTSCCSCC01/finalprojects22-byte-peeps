import { AllowNull, BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import InstagramMedia from "./media";

@Table({
  timestamps: false,
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
  @Column
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

  @ForeignKey(() => InstagramMedia)
  @AllowNull(false)
  @Column
  mediaId: number

  @BelongsTo(() => InstagramMedia)
  media: InstagramMedia;
}