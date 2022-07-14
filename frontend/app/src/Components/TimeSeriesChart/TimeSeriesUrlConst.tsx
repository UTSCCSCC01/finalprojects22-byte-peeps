export interface TimeSeriesResponse {
  data: {
    date: string;
    time: string;
    positive: number;
    negative: number;
    neutral: number;
  }[];
}

export enum TimeSeriesUrlRequest {
  Facebook = '/facebook/posts/sentiment_analysis',
  Instagram = '/instagram/media/sentiment_analysis',
  Twitter = '/twitter/tweets/sentiment_analysis',
  YouTube = '/youtube/videos/sentiment_analysis',
  Reddit = '/reddit/listings/sentiment_analysis',
  Empty = '',
}
