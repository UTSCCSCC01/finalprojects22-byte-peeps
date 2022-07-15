type FacebookWordCloudResponse = {
    comments: string;
  };
  
  export type WordCloudResponse = FacebookWordCloudResponse;
  
  export enum WordCloudUrlRequest {
    Facebook = '/facebook/word_cloud',
    Instagram = '/instagram/word_cloud',
    YouTube = '/youtube/word_cloud'
  }