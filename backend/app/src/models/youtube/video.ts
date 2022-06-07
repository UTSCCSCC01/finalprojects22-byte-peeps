import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import YouTubeChannel from "./channel";
import YoutubeComment from "./comment";

@Table({
  timestamps: false,
  tableName: 'youtube_videos',
})
export default class YouTubeVideo extends Model {
  @AllowNull(false)
  @Column
  resourceId: string

  @AllowNull(false)
  @Column
  views: number
  
  @AllowNull(false)
  @Column
  likes: number

  @ForeignKey(() => YouTubeChannel)
  @AllowNull(false)
  @Column
  channelId: number

  @BelongsTo(() => YouTubeChannel)
  channel: YouTubeChannel;

  @HasMany(() => YoutubeComment)
  comments: YoutubeComment[];
}