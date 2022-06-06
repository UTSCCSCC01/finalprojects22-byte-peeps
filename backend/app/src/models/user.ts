import { Table, Model, Column, AllowNull, HasOne } from 'sequelize-typescript';
import * as Facebook from './facebook';

@Table({
  timestamps: false,
  tableName: 'users',
})
export class User extends Model {
  @AllowNull(false)
  @Column
  name: string

  @HasOne(() => Facebook.Api)
  facebookApi: Facebook.Api
}
