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

const redditColDef: MetricsTableColDef = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
  {
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
    field: 'text',
    headerName: 'Text',
    flex: 1,
    showHover: true,
  },
  {
    field: 'score',
    headerName: 'Upvoted',
    type: 'number',
    ...defaultColumnStyle,
    ...defaultNumberFilterStyle,
  },
  {
    field: 'numComments',
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

export const PostsTableColDefConst = {
  Reddit: redditColDef,
  Default: defaultColDef,
};
