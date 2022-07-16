import { AllowNull, BelongsTo, Column, DeletedAt, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "../user/user";
import RedditListing from "./listing";

@Table({
  tableName: 'reddit_subreddits',
})
export default class RedditSubreddit extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => RedditListing)
  listings: RedditListing[];
}