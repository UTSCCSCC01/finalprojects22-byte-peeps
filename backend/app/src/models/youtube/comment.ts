import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import YouTubeVideo from './video';

@Table({
  tableName: 'youtube_comments',
})
export default class YouTubeComment extends Model {
  @AllowNull(false)
  @Unique
  @Column
  resourceId: string;

  @AllowNull(false)
  @Column
  userName: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  message: string;

  @AllowNull
  @Column
  date: Date;

  @Default(0)
  @Column
  likes: number;

  @Column
  sentimentAnalysis: string;

  @Column
  topicClassification: string;

  @Column
  subjectivityAnalysis: string;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => YouTubeVideo)
  @AllowNull(false)
  @Column
  videoId: number;

  @BelongsTo(() => YouTubeVideo)
  videos: YouTubeVideo[];
}
