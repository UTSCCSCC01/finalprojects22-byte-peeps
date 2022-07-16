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
import TwitterConversation from './conversation';
import TwitterUser from './user';

@Table({
  tableName: 'twitter_tweets',
})
export default class TwitterTweet extends Model {
  @AllowNull(false)
  @Column
  twitterId: string;

  @AllowNull(false)
  @Column
  conversationId: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  text: string;

  @AllowNull
  @Column
  date: Date;

  @Default(0)
  @Column
  retweets: number;

  @Default(0)
  @Column
  replies: number;

  @Default(0)
  @Column
  likes: number;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => TwitterUser)
  @AllowNull(false)
  @Column
  twitterUserId: number;

  @BelongsTo(() => TwitterUser)
  twitterUser: TwitterUser;

  @HasMany(() => TwitterConversation)
  conversations: TwitterConversation[];
}
