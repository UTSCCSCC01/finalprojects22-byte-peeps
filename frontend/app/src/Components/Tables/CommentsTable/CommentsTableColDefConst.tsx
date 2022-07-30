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
    field: 'message',
    headerName: 'Comment',
    flex: 1,
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
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
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
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
    field: 'message',
    headerName: 'Message',
    flex: 1,
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
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
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
];

const redditColDef: MetricsTableColDef = [
  {
    field: 'text',
    headerName: 'Comment',
    flex: 1,
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
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
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
];

const twitterColDef: MetricsTableColDef = [
  {
    field: 'text',
    headerName: 'Comment',
    flex: 1,
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
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
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
];

export const CommentsTableColDefConst = {
  Facebook: defaultColDef,
  Instagram: instagramColDef,
  Twitter: twitterColDef,
  YouTube: defaultColDef,
  Reddit: redditColDef,
  Default: defaultColDef,
};
