import { AllowNull, BelongsTo, Column, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import RedditComment from "./comment";
import RedditSubreddit from "./subreddit";

@Table({
  timestamps: false,
  tableName: 'reddit_listings',
})
export default class RedditListing extends Model {
  @AllowNull(false)
  @Column
  dataid: string

  @AllowNull(false)
  @Column
  title: string

  @AllowNull(false)
  @Column
  text: string

  @AllowNull
  @Column
  date: Date

  @Default(0)
  @Column
  score: number

  @Default(0)
  @Column
  numComments: number

  @AllowNull(false)
  @Column
  permalink: string

  @ForeignKey(() => RedditSubreddit)
  @AllowNull(false)
  @Column
  subredditId: number

  @BelongsTo(() => RedditSubreddit)
  Subreddit: RedditSubreddit;

  @HasMany(() => RedditComment)
  comments: RedditComment[];
}