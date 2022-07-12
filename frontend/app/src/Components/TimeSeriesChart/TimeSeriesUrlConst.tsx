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
  Facebook = '/facebook/posts/sentimentAnalysis',
  Instagram = '/instagram/media/sentimentAnalysis',
  Twitter = '/twitter/tweets/sentimentAnalysis',
  YouTube = 'youtube/video/sentimentAnalysis',
  Reddit = 'reddit/listings/sentimentAnalysis',
  Empty = '',
}
