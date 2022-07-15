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
import GoogleReviewsAccount from './account';
import GoogleReviewsReview from './review';

@Table({
  tableName: 'google_reviews_locations',
})
export default class GoogleReviewsLocation extends Model {
  @AllowNull(false)
  @Column
  locationId: string;

  averageRating() {
    const ratings = this.reviews.map((r) => r.rating);
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  }

  numReviews() {
    return this.reviews.length;
  }

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
