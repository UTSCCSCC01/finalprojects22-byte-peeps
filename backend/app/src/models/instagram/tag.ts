import { Table, Model, Column, BelongsTo, HasMany, ForeignKey, AllowNull, Default, DataType } from 'sequelize-typescript';
import InstagramApi from './api';

@Table({
  timestamps: false,
  tableName: 'instagram_tags',
})
export default class InstagramTag extends Model {
  @AllowNull(false)
  @Column
  dataId: string;

  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  caption: string;

  @AllowNull
  @Column
  date: Date;

  @Default(0)
  @Column
  likes: number;

  @Default(0)
  @Column
  numComments: number;

  @Column
  sentimentAnalysis: string;

  @Column
  topicClassification: string;

  @Column
  subjectivityAnalysis: string;

  @ForeignKey(() => InstagramApi)
  @AllowNull(false)
  @Column
  apiId: number;

  @BelongsTo(() => InstagramApi)
  api: InstagramApi;
}