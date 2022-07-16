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
import YelpReview from './review';

@Table({
  tableName: 'yelp_businesses',
})
export default class YelpBusiness extends Model {
  @AllowNull(false)
  @Column
  businessId: string;

  @AllowNull(false)
  @Column
  name: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => YelpReview)
  reviews: YelpReview[];
}
