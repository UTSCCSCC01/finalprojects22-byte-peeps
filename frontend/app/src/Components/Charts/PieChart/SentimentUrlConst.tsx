import { SentimentAnalysis } from '../../../Redux/Slices/facebook/facebookSlice';

export type SentimentAnalysisResponse = SentimentAnalysis;

export enum SentimentUrlRequest {
  Facebook = '/facebook/comments/sentiment_analysis',
  Instagram = '/instagram/comments/sentiment_analysis',
  Twitter = '/twitter/comments/sentiment_analysis',
  YouTube = '/youtube/comments/sentiment_analysis',
  Reddit = '/reddit/comments/sentiment_analysis',
  GoogleReviews = '/googleReviews/comments/sentiment_analysis',
  Yelp = '/yelp/comments/sentiment_analysis',
}
