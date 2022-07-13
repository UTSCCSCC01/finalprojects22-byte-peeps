import { AllowNull, BelongsTo, Column, DeletedAt, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import User from "../user/user";
import GoogleReviewsReview from "./review";

@Table({
  tableName: 'google_reviews_apis',
})
export default class GoogleReviewsApi extends Model {
  @AllowNull(false)
  @Column
  token: string

  @AllowNull(false)
  @Column
  isActive: boolean

  @AllowNull(false)
  @Column
  accountId: string

  @AllowNull(false)
  @Column
  locationId: string

  @DeletedAt
  deletedAt: Date

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => GoogleReviewsReview)
  reviews: GoogleReviewsReview[]
}