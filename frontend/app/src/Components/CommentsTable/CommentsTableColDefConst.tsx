import {
  CommentsTableColDef,
  DefaultColumnStyleType,
} from './CommentsTableQueryTypes';

const defaultColumnStyle: DefaultColumnStyleType = {
  sortable: false,
  filterable: false,
  headerAlign: 'left',
  align: 'left',
};

const defaultColDef: CommentsTableColDef = [
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

const redditColDef: CommentsTableColDef = [
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

const twitterColDef: CommentsTableColDef = [
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
  Instagram: defaultColDef,
  Twitter: twitterColDef,
  YouTube: defaultColDef,
  Reddit: redditColDef,
  Default: defaultColDef,
};
