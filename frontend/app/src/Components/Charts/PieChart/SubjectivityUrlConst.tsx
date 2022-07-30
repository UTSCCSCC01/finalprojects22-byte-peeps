export interface SubjectivityAnalysis {
  subjective: number;
  objective: number;
}

export type SubjectivityAnalysisResponse = SubjectivityAnalysis;

export enum SubjectivityUrlRequest {
  Facebook = '/facebook/comments/subjectivity_analysis',
  Instagram = '/instagram/comments/subjectivity_analysis',
  Twitter = '/twitter/comments/subjectivity_analysis',
  YouTube = '/youtube/comments/subjectivity_analysis',
  Reddit = '/reddit/comments/subjectivity_analysis',
  GoogleReviews = '/googleReviews/comments/subjectivity_analysis',
  Yelp = '/yelp/comments/subjectivity_analysis',
}
