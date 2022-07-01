import { AllowNull, BelongsTo, Column, Default, DeletedAt, ForeignKey, Model, Table } from "sequelize-typescript";
import RedditListing from "./listing";

@Table({
  tableName: 'reddit_comments',
})
export default class RedditComment extends Model {
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
  replies: number;

  @Column
  sentimentAnalysis: string;

  @Column
  topicClassification: string;

  @Column
  subjectivityAnalysis: string;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => RedditListing)
  @AllowNull(false)
  @Column
  listingId: number;

  @BelongsTo(() => RedditListing)
  listing: RedditListing[];
}