import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
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

  @AllowNull(false)
  @Column
  likes: number

  @ForeignKey(() => YouTubeVideo)
  @AllowNull(false)
  @Column
  videoId: number

  @BelongsTo(() => YouTubeVideo)
  videos: YouTubeVideo[];
}