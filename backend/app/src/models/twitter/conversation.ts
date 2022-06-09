import { AllowNull, BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import TwitterTweet from "./tweet";

@Table({
  timestamps: false,
  tableName: 'twitter_conversations',
})
export default class TwitterConversation extends Model {
  @AllowNull(false)
  @Column
  text: string

  @AllowNull
  @Column
  date: Date

  @Default(0)
  @Column
  retweets: number

  @Default(0)
  @Column
  replies: number

  @Default(0)
  @Column
  likes: number

  @ForeignKey(() => TwitterTweet)
  @AllowNull(false)
  @Column
  tweetId: number

  @BelongsTo(() => TwitterTweet)
  tweet: TwitterTweet[];
}