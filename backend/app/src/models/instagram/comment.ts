import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import InstagramMedia from "./media";

@Table({
  timestamps: false,
  tableName: 'instagram_comments',
})
export default class InstagramComment extends Model {
  @AllowNull(false)
  @Column
  userName: string

  @AllowNull(false)
  @Column
  message: string

  @ForeignKey(() => InstagramMedia)
  @AllowNull(false)
  @Column
  mediaId: number

  @BelongsTo(() => InstagramMedia)
  media: InstagramMedia;
}