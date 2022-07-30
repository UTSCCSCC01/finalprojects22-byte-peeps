import {
<<<<<<< HEAD:frontend/app/src/Components/Tables/CommentsTable/CommentsTableColDefConst.tsx
<<<<<<< HEAD:frontend/app/src/Components/Tables/CommentsTable/CommentsTableColDefConst.tsx
  defaultColumnStyle,
  defaultNumberFilterStyle,
  defaultStringFilterStyle,
} from '../MetricsTable/MetricsTableColDefConst';
import { MetricsTableColDef } from '../MetricsTable/MetricsTableQueryTypes';

const defaultColDef: MetricsTableColDef = [
=======
=======
>>>>>>> development:frontend/app/src/Components/CommentsTable/CommentsTableColDefConst.tsx
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
>>>>>>> development:frontend/app/src/Components/CommentsTable/CommentsTableColDefConst.tsx
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
