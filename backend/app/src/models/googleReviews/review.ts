import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  Is,
  Model,
  Table,
} from 'sequelize-typescript';
import GoogleReviewsLocation from './location';

const RATING_REGEX = /^[1-5]$/;

@Table({
  tableName: 'google_reviews_reviews',
})
export default class GoogleReviewsReview extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  message: string;

  // Can be null if reviewer is anonymous
  @Column
  reviewer: string;

  // Can be unspecified
  @Is('ValidRating', (value) => {
    if (!RATING_REGEX.test(value))
      throw new Error(
        'Invalid rating specified, value needs to be from 1 to 5 or null'
      );
  })
  @Column
  rating: number;

  @Column
  response: string;

  @AllowNull(false)
  @Column
  date: Date;

  @AllowNull(false)
  @Column
  reviewId: string;

  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => GoogleReviewsLocation)
  @AllowNull(false)
  @Column
  apiId: number;

  @BelongsTo(() => GoogleReviewsLocation)
  api: GoogleReviewsLocation;
}
