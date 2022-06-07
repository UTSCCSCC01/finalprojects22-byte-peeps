import { AllowNull, BelongsTo, Column, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
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

  @Default(0)
  @Column
  views: number
  
  @Default(0)
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