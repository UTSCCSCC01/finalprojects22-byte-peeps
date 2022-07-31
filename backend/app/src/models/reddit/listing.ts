import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import RedditComment from './comment';
import RedditSubreddit from './subreddit';

@Table({
  tableName: 'reddit_listings',
})
export default class RedditListing extends Model {
  @AllowNull(false)
  @Column
  dataId: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
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

  @Column
  sentimentAnalysis: string;

  @Column
  topicClassification: string;

  @Column
  subjectivityAnalysis: string;

  @DeletedAt
  deletedAt?: Date;

  @AllowNull(false)
  @Column
  permalink: string;

  @ForeignKey(() => RedditSubreddit)
  @AllowNull(false)
  @Column
  subredditId: number;

  @BelongsTo(() => RedditSubreddit)
  subreddit: RedditSubreddit;

  @HasMany(() => RedditComment)
  comments: RedditComment[];
}
