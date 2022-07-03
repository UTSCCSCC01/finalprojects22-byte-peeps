import { AllowNull, BelongsTo, Column, DeletedAt, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "../user/user";
import TwitterTweet from "./tweet";

@Table({
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

  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => TwitterTweet)
  tweets: TwitterTweet[]
}