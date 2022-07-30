import {
  defaultColumnStyle,
  defaultNumberFilterStyle,
  defaultStringFilterStyle,
} from '../MetricsTable/MetricsTableColDefConst';
import { MetricsTableColDef } from '../MetricsTable/MetricsTableQueryTypes';

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
    field: 'review',
    headerName: 'Review',
    flex: 1,
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
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
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
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
    field: 'text',
    headerName: 'Review',
    flex: 1,
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
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
    field: 'topicClassification',
    headerName: 'Topic',
    ...defaultColumnStyle,
    ...defaultStringFilterStyle,
  },
];

export const ReviewsTableColDefConst = {
  GoogleReviews: googleReviewsColDef,
  Yelp: yelpColDef,
  Default: [],
};
