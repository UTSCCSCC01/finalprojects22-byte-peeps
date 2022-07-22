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
import YelpBusiness from './business';

const RATING_REGEX = /^[1-5]$/;

@Table({
  tableName: 'yelp_reviews',
})
export default class YelpReview extends Model {
  @AllowNull(false)
  @Column
  dataId: string;

  // Can be unspecified
  @Is('ValidRating', (value) => {
    if (!RATING_REGEX.test(value))
      throw new Error(
        'Invalid rating specified, value needs to be from 1 to 5 or null'
      );
  })
  @Column
  rating: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  text: string;

  @AllowNull(false)
  @Column
  userName: string;

  @AllowNull
  @Column
  date: Date;

  @Column
  sentimentAnalysis: string;

  @Column
  topicClassification: string;

  @Column
  subjectivityAnalysis: string;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => YelpBusiness)
  @AllowNull(false)
  @Column
  businessId: number;

  @BelongsTo(() => YelpBusiness)
  business: YelpBusiness;
}
