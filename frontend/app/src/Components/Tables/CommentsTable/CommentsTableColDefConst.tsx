import {
  DefaultColumnStyleType,
  MetricsTableColDef,
} from '../MetricsTable/MetricsTableQueryTypes';

const defaultColumnStyle: DefaultColumnStyleType = {
  sortable: false,
  filterable: false,
  headerAlign: 'left',
  align: 'left',
};

const defaultColDef: MetricsTableColDef = [
  {
    field: 'userName',
    headerName: 'Name',
    ...defaultColumnStyle,
  },
  {
    field: 'message',
    headerName: 'Comment',
    flex: 1,
    ...defaultColumnStyle,
  },
  {
    field: 'likes',
    headerName: 'Likes',
    type: 'number',
    ...defaultColumnStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
  },
  {
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
  },
];

const instagramColDef: MetricsTableColDef = [
  {
    field: 'userName',
    headerName: 'Name',
    ...defaultColumnStyle,
  },
  {
    field: 'type',
    headerName: 'Type',
    ...defaultColumnStyle,
  },
  {
    field: 'message',
    headerName: 'Message',
    flex: 1,
    ...defaultColumnStyle,
  },
  {
    field: 'likes',
    headerName: 'Likes',
    type: 'number',
    ...defaultColumnStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
  },
  {
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
  },
];

const redditColDef: MetricsTableColDef = [
  {
    field: 'text',
    headerName: 'Comment',
    flex: 1,
    ...defaultColumnStyle,
  },
  {
    field: 'score',
    headerName: 'Upvotes',
    type: 'number',
    ...defaultColumnStyle,
  },
  {
    field: 'replies',
    headerName: 'Replies',
    type: 'number',
    ...defaultColumnStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
  },
  {
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
  },
];

const twitterColDef: MetricsTableColDef = [
  {
    field: 'text',
    headerName: 'Comment',
    flex: 1,
    ...defaultColumnStyle,
  },
  {
    field: 'retweets',
    headerName: 'Retweets',
    type: 'number',
    ...defaultColumnStyle,
  },
  {
    field: 'likes',
    headerName: 'Likes',
    type: 'number',
    ...defaultColumnStyle,
  },
  {
    field: 'replies',
    headerName: 'Replies',
    type: 'number',
    ...defaultColumnStyle,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    ...defaultColumnStyle,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    ...defaultColumnStyle,
  },
  {
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
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
