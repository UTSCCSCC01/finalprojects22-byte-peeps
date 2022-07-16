import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import FacebookApi from './api';
import FacebookComment from './comment';

@Table({
  tableName: 'facebook_posts',
})
export default class FacebookPost extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  message: string;

  @AllowNull(false)
  @Column
  date: Date;

  @Default(0)
  @Column
  likes: number;

  @Default(0)
  @Column
  loves: number;

  @Default(0)
  @Column
  cares: number;

  @Default(0)
  @Column
  hahas: number;

  @Default(0)
  @Column
  wows: number;

  @Default(0)
  @Column
  sads: number;

  @Default(0)
  @Column
  angrys: number;

  getNumberOfReactions() {
    return (
      this.likes +
      this.loves +
      this.cares +
      this.hahas +
      this.wows +
      this.sads +
      this.angrys
    );
  }

  @AllowNull(false)
  @Column
  dataId: string;

  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => FacebookApi)
  @AllowNull(false)
  @Column
  apiId: number;

  @BelongsTo(() => FacebookApi)
  api: FacebookApi;

  @HasMany(() => FacebookComment)
  comments: FacebookComment[];
}
