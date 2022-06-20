import { AllowNull, BelongsTo, Column, DeletedAt, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import User from "../user/user";
import InstagramApi from "../instagram/api";
import FacebookPost from "./post";

@Table({
  tableName: 'facebook_apis',
  deletedAt: true
})
export default class FacebookApi extends Model {
  @AllowNull(false)
  @Column
  token: string

  @Column
  isActive: boolean

  @Column
  pageId: string

  @DeletedAt
  deletedAt: Date

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => FacebookPost)
  posts: FacebookPost[]

  @HasOne(() => InstagramApi)
  intagramApi: InstagramApi
}