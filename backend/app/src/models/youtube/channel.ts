import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "../user/user";
import YouTubeVideo from "./video";

@Table({
  timestamps: false,
  tableName: 'youtube_channels',
})
export default class YouTubeChannel extends Model {
  @AllowNull(false)
  @Column
  resourceId: string

  @AllowNull(false)
  @Column
  name: string
  
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => YouTubeVideo)
  posts: YouTubeVideo[]
}