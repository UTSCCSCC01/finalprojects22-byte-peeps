import { Table, Model, Column, AllowNull, HasOne } from 'sequelize-typescript';
import FacebookApi from '../facebook/api';

@Table({
  timestamps: false,
  tableName: 'users',
})
export default class User extends Model {
  @AllowNull(false)
  @Column
  name: string

  @HasOne(() => FacebookApi)
  facebookApi: FacebookApi
}
