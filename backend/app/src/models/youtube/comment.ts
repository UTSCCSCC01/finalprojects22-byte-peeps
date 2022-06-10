import { AllowNull, BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import YouTubeVideo from "./video";

@Table({
  timestamps: false,
  tableName: 'youtube_comments',
})
export default class YoutubeComment extends Model {
  @AllowNull(false)
  @Column
  resourceId: string
  
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

  @ForeignKey(() => YouTubeVideo)
  @AllowNull(false)
  @Column
  videoId: number

  @BelongsTo(() => YouTubeVideo)
  videos: YouTubeVideo[];
}