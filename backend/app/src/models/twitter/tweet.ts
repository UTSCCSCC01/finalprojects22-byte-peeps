import { AllowNull, BelongsTo, Column, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import TwitterConversation from "./conversation";
import TwitterUser from "./user";

@Table({
  timestamps: false,
  tableName: 'twitter_tweets',
})
export default class TwitterTweet extends Model {
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

  @ForeignKey(() => TwitterUser)
  @AllowNull(false)
  @Column
  twitterUserId: number

  @BelongsTo(() => TwitterUser)
  twitterUser: TwitterUser;

  @HasMany(() => TwitterConversation)
  conversations: TwitterConversation[];
}