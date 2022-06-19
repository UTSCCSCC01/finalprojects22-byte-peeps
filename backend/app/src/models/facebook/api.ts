import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import User from "../user/user";
import InstagramApi from "../instagram/api";
import FacebookPost from "./post";

@Table({
  timestamps: false,
  tableName: 'facebook_apis',
})
export default class FacebookApi extends Model {
  @AllowNull(false)
  @Column
  token: string

  @Column
  isActive: boolean

  @Column
  pageId: number

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