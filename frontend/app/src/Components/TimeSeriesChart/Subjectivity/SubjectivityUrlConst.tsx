export interface TimeSeriesResponse {
  data: {
    date: string;
    time: string;
    subjective: number;
    objective: number;
  }[];
}

export enum SubjectivityUrlRequest {
  Facebook = '/facebook/posts/subjectivity_analysis',
  Instagram = '/instagram/media/subjectivity_analysis',
  Twitter = '/twitter/tweets/subjectivity_analysis',
  YouTube = '/youtube/videos/subjectivity_analysis',
  Reddit = '/reddit/listings/subjectivity_analysis',
  Empty = '',
}