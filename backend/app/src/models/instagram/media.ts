import { Table, Model, Column, BelongsTo, HasMany, ForeignKey, AllowNull, Default, DataType, DeletedAt } from 'sequelize-typescript';
import InstagramApi from './api';
import InstagramComment from './comment';

@Table({
  tableName: 'instagram_media',
})
export default class InstagramMedia extends Model {
  @AllowNull(false)
  @Column
  dataId: string
  
  @AllowNull(false)
  @Column(DataType.TEXT)
  caption: string

  @AllowNull
  @Column
  date: Date

  @Default(0)
  @Column
  likes: number

  @Default(0)
  @Column
  numComments: number

  @DeletedAt
  deletedAt: Date

  @HasMany(() => InstagramComment)
  comments: InstagramComment[];

  @ForeignKey(() => InstagramApi)
  @AllowNull(false)
  @Column
  apiId: number

  @BelongsTo(() => InstagramApi)
  api: InstagramApi;
}