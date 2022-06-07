import { AllowNull, BelongsTo, Column, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
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

  @Default(0)
  @Column
  likes: number

  @Default(0)
  @Column
  loves: number

  @Default(0)
  @Column
  cares: number

  @Default(0)
  @Column
  hahas: number

  @Default(0)
  @Column
  wows: number

  @Default(0)
  @Column
  sads: number

  @Default(0)
  @Column
  angrys: number

  @AllowNull(false)
  @Column
  dataId: string

  @ForeignKey(() => FacebookApi)
  @AllowNull(false)
  @Column
  apiId: number

  @BelongsTo(() => FacebookApi)
  api: FacebookApi;

  @HasMany(() => FacebookComment)
  comments: FacebookComment[];
}