import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import YelpBusiness from './business';

@Table({
  tableName: 'yelp_reviews',
})
export default class YelpReview extends Model {
  @AllowNull(false)
  @Column
  dataId: string;

  @AllowNull(false)
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
