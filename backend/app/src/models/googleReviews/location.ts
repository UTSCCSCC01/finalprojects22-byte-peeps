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
import GoogleReviewsReview from './review';

@Table({
  tableName: 'google_reviews_locations',
})
export default class GoogleReviewsLocation extends Model {
  @AllowNull(false)
  @Column
  token: string;

  @AllowNull(false)
  @Column
  isActive: boolean;

  @AllowNull(false)
  @Column
  accountId: string;

  @AllowNull(false)
  @Column
  locationId: string;

  @Column
  averageRating: number;

  @Column
  numReviews: number;

  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => GoogleReviewsReview)
  reviews: GoogleReviewsReview[];
}
