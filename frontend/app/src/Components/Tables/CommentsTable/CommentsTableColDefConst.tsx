import {
  defaultColumnStyle,
  defaultNumberFilterStyle,
  defaultStringFilterStyle,
} from '../MetricsTable/MetricsTableColDefConst';
import { MetricsTableColDef } from '../MetricsTable/MetricsTableQueryTypes';

const defaultColDef: MetricsTableColDef = [
  {
    field: 'userName',
    headerName: 'Name',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'message',
    headerName: 'Comment',
    flex: 1,
    showHover: true,
  },
  {
    field: 'likes',
    headerName: 'Likes',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'topicClassification',
    headerName: 'Topic',
    showHover: true,
  },
];

const instagramColDef: MetricsTableColDef = [
  {
    field: 'userName',
    headerName: 'Name',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    field: 'type',
    headerName: 'Type',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'message',
    headerName: 'Message',
    flex: 1,
    showHover: true,
  },
  {
    field: 'likes',
    headerName: 'Likes',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'topicClassification',
    headerName: 'Topic',
    showHover: true,
  },
];

const redditColDef: MetricsTableColDef = [
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'text',
    headerName: 'Comment',
    flex: 1,
    showHover: true,
  },
  {
    field: 'score',
    headerName: 'Upvotes',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'replies',
    headerName: 'Replies',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'topicClassification',
    headerName: 'Topic',
    showHover: true,
  },
];

const twitterColDef: MetricsTableColDef = [
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'text',
    headerName: 'Comment',
    flex: 1,
    showHover: true,
  },
  {
    field: 'retweets',
    headerName: 'Retweets',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'likes',
    headerName: 'Likes',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'replies',
    headerName: 'Replies',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'topicClassification',
    headerName: 'Topic',
    showHover: true,
  },
];

const googleReviewsColDef: MetricsTableColDef = [
  {
    field: 'reviewer',
    headerName: 'Name',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    field: 'title',
    headerName: 'Title',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'review',
    headerName: 'Review',
    flex: 1,
    showHover: true,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'topicClassification',
    headerName: 'Topic',
    showHover: true,
  },
];

const yelpColDef: MetricsTableColDef = [
  {
    field: 'userName',
    headerName: 'Name',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'text',
    headerName: 'Review',
    flex: 1,
    showHover: true,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'topicClassification',
    headerName: 'Topic',
    showHover: true,
  },
];

export const CommentsTableColDefConst = {
  Facebook: defaultColDef,
  Instagram: instagramColDef,
  Twitter: twitterColDef,
  YouTube: defaultColDef,
  Reddit: redditColDef,
  GoogleReviews: googleReviewsColDef,
  Yelp: yelpColDef,
  Default: defaultColDef,
};
