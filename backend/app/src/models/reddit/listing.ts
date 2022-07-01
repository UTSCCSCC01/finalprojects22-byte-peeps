import { AllowNull, BelongsTo, Column, Default, DeletedAt, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import RedditComment from "./comment";
import RedditSubreddit from "./subreddit";

@Table({
  tableName: 'reddit_listings',
})
export default class RedditListing extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  text: string;

  @AllowNull
  @Column
  date: Date;

  @Default(0)
  @Column
  score: number;

  @Default(0)
  @Column
  numComments: number;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => RedditSubreddit)
  @AllowNull(false)
  @Column
  subredditId: number;

  @BelongsTo(() => RedditSubreddit)
  subreddit: RedditSubreddit;

  @HasMany(() => RedditComment)
  comments: RedditComment[];
}