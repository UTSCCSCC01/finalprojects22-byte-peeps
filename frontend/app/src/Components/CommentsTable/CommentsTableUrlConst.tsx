interface InstagramCommentsTableResponse {
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

export type CommentsTableResponse = InstagramCommentsTableResponse;

export enum CommentsTableUrlRequest {
  Instagram = '/instagram/comments',
}
