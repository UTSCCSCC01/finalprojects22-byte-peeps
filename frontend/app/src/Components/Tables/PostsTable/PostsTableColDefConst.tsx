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

const redditColDef: MetricsTableColDef = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    ...defaultColumnStyle,
  },
  {
    field: 'text',
    headerName: 'Text',
    flex: 1,
    ...defaultColumnStyle,
  },
  {
    field: 'score',
    headerName: 'Upvoted',
    type: 'number',
    ...defaultColumnStyle,
  },
  {
    field: 'numComments',
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

export const PostsTableColDefConst = {
  Reddit: redditColDef,
  Default: defaultColDef,
};
