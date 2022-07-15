type FacebookWordCloudResponse = {
    comments: string;
  };
  
  export type WordCloudResponse = FacebookWordCloudResponse;
  
  export enum WordCloudUrlRequest {
    Instagram = '/instagram/comments',
  }