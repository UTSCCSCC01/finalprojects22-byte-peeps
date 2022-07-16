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
  Facebook = '/facebook/comments',
  Instagram = '/instagram/comments',
  Twitter = '/twitter/comments',
  YouTube = '/youtube/comments',
  Reddit = '/reddit/comments'
}
