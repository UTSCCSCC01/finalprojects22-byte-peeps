import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "../user/user";
import TwitterTweet from "./tweet";

@Table({
  timestamps: false,
  tableName: 'twitter_users',
})
export default class TwitterUser extends Model {
  @AllowNull(false)
  @Column
  twitterId: string

  @AllowNull(false)
  @Column
  username: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => TwitterTweet)
  tweets: TwitterTweet[]
}