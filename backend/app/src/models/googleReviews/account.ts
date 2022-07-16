import {
  AllowNull,
  BelongsTo,
  Column,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import User from '../user/user';
import GoogleReviewsLocation from './location';

@Table({
  tableName: 'google_reviews_accounts',
})
export default class GoogleReviewsAccount extends Model {
  @AllowNull(false)
  @Column
  token: string;

  @AllowNull(false)
  @Column
  accountId: string;

  @AllowNull(false)
  @Column
  isActive: boolean;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => GoogleReviewsLocation)
  locations: GoogleReviewsLocation[];

  @DeletedAt
  deletedAt: Date;
}
