interface RedditListingsTableResponse {
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

export type PostsTableResponse = RedditListingsTableResponse;

export enum PostsTableUrlRequest {
  Reddit = '/reddit/listings/table',
}
