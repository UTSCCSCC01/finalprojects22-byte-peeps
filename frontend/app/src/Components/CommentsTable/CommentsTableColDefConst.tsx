import {
  getGridNumericOperators,
  getGridStringOperators,
} from '@mui/x-data-grid';
import {
  CommentsTableColDef,
  DefaultColumnFilterStyleType,
  DefaultColumnStyleType,
} from './CommentsTableQueryTypes';

const defaultColumnStyle: DefaultColumnStyleType = {
  sortable: false,
  filterable: true,
  headerAlign: 'left',
  align: 'left',
};

// Filter operators for strings
const filterStringOperators = getGridStringOperators().filter(({ value }) =>
  ['contains'].includes(value)
);
const defaultStringFilterStyle: DefaultColumnFilterStyleType = {
  filterOperators: filterStringOperators,
};

// Filter operators for numbers
const filterNumberOperators = getGridNumericOperators().filter(({ value }) =>
  ['='].includes(value)
);
const defaultNumberFilterStyle: DefaultColumnFilterStyleType = {
  filterOperators: filterNumberOperators,
};

const defaultColDef: CommentsTableColDef = [
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

const redditColDef: CommentsTableColDef = [
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

const twitterColDef: CommentsTableColDef = [
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
  Instagram: defaultColDef,
  Twitter: twitterColDef,
  YouTube: defaultColDef,
  Reddit: redditColDef,
  Default: defaultColDef,
};
