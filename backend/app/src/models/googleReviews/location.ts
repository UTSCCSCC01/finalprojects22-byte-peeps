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
import GoogleReviewsAccount from './account';
import GoogleReviewsReview from './review';

@Table({
  tableName: 'google_reviews_locations',
})
export default class GoogleReviewsLocation extends Model {
  @AllowNull(false)
  @Column
  locationId: string;

  @Column
  averageRating: number;

  @Column
  numReviews: number;

  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => GoogleReviewsAccount)
  @AllowNull(false)
  @Column
  accountId: number;

  @BelongsTo(() => GoogleReviewsAccount)
  account: GoogleReviewsAccount;

  @HasMany(() => GoogleReviewsReview)
  reviews: GoogleReviewsReview[];
}
