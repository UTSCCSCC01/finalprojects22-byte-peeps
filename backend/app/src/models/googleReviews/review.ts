import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import GoogleReviewsApi from './api';

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

  @ForeignKey(() => GoogleReviewsApi)
  @AllowNull(false)
  @Column
  apiId: number;

  @BelongsTo(() => GoogleReviewsApi)
  api: GoogleReviewsApi;
}
