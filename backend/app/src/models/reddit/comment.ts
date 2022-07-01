import { AllowNull, BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import RedditListing from "./listing";

@Table({
  timestamps: false,
  tableName: 'reddit_comments',
})
export default class RedditComment extends Model {
  @AllowNull(false)
  @Column
  dataId: string

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
  replies: number

  @Column
  sentimentAnalysis: string

  @Column
  topicClassification: string

  @Column
  subjectivityAnalysis: string

  @ForeignKey(() => RedditListing)
  @AllowNull(false)
  @Column
  listingId: number

  @BelongsTo(() => RedditListing)
  tweet: RedditListing[];
}