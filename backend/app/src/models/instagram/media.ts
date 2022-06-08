import { Table, Model, Column, BelongsTo, HasMany, ForeignKey, AllowNull, Default } from 'sequelize-typescript';
import InstagramApi from './api';
import InstagramComment from './comment';

@Table({
  timestamps: false,
  tableName: 'instagram_media',
})
export default class InstagramMedia extends Model {
  @AllowNull(false)
  @Column
  dataId: string
  
  @AllowNull(false)
  @Column
  message: string

  @AllowNull
  @Column
  date: Date

  @Default(0)
  @Column
  likes: number

  @Default(0)
  @Column
  numComments: number

  @HasMany(() => InstagramComment)
  comments: InstagramComment[];

  @ForeignKey(() => InstagramApi)
  @AllowNull(false)
  @Column
  apiId: number

  @BelongsTo(() => InstagramApi)
  api: InstagramApi;
}