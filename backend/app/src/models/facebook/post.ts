import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import FacebookApi from "./api";
import FacebookComment from "./comment";

@Table({
  timestamps: false,
  tableName: 'facebook_posts',
})
export default class FacebookPost extends Model {
  @AllowNull(false)
  @Column
  message: string

  @HasMany(() => FacebookComment)
  comments: FacebookComment[];

  @ForeignKey(() => FacebookApi)
  @AllowNull(false)
  @Column
  apiId: number

  @BelongsTo(() => FacebookApi)
  api: FacebookApi;
}