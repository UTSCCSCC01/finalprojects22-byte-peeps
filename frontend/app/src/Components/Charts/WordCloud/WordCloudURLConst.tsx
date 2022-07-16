type FacebookWordCloudResponse = {
    comments: string;
  };
  
  export type WordCloudResponse = FacebookWordCloudResponse;
  
  export enum WordCloudUrlRequest {
    Facebook = '/facebook/comments/word_cloud',
    Instagram = '/instagram/comments/word_cloud',
    YouTube = '/youtube/comments/word_cloud',
    Twitter = '',
    Reddit = '',
    GoogleReviews = '',
    Yelp = '',

  }