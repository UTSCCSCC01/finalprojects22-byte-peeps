interface GoogleReviewsReviewsTableResponse {
  count: number;
  data: {
    id: number;
    userName: string;
    message: string;
    likes: number;
    sentimentAnalysis: string;
    subjectivityAnalysis: string;
    topicClassification: string;
  }[];
}

export type ReviewsTableResponse = GoogleReviewsReviewsTableResponse;

export enum ReviewsTableUrlRequest {
  GoogleReviews = '/googleReviews/comments',
  Yelp = '/yelp/comments',
}
