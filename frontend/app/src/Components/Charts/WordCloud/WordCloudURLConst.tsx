import { WordCloudData } from './WordCloudQueryTypes';

export type CommentsWordCloudResponse = WordCloudData;

export enum CommentsWordCloudUrlRequest {
  Facebook = '/facebook/comments/wordCloud',
  Instagram = '/instagram/comments/wordCloud',
  YouTube = '/youtube/comments/wordCloud',
  Twitter = '/twitter/comments/wordCloud',
  Reddit = '/reddit/comments/wordCloud',
  GoogleReviews = '',
  Yelp = '',
}
