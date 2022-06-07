import { Table, Model, Column, BelongsTo, HasMany, ForeignKey, AllowNull } from 'sequelize-typescript';
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

  @HasMany(() => InstagramComment)
  comments: InstagramComment[];

  @ForeignKey(() => InstagramApi)
  @AllowNull(false)
  @Column
  apiId: number

  @BelongsTo(() => InstagramApi)
  api: InstagramApi;
}