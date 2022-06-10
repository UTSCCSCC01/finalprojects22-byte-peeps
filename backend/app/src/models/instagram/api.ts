import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import FacebookApi from "../facebook/api";
import User from "../user/user";
import InstagramMedia from "./media";
import InstagramTag from "./tag";

@Table({
  timestamps: false,
  tableName: 'instagram_apis',
})
export default class InstagramApi extends Model {
  @ForeignKey(() => FacebookApi)
  @AllowNull(false)
  @Column
  facebookApiId: number

  @BelongsTo(() => FacebookApi)
  facebookApi: FacebookApi;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User

  @HasMany(() => InstagramMedia)
  media: InstagramMedia[]

  @HasMany(() => InstagramTag)
  tags: InstagramTag[]

  @AllowNull(false)
  @Column
  nodeId: string
}