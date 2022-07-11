import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import HTTP from '../../utils/http';
import MetricsTable from './MetricsTable';

const getPage = async (
  page: number,
  pageSize: number
): Promise<{
  count: number;
  data: {
    id: number;
    userName: string;
    message: string;
    likes: number;
    sentimentAnalysis: string;
    subjectivityAnalysis: string;
    topicClassification: string;
  }[];
}> => {
  return HTTP.get('/instagram/comments', {
    params: { page: page, pageSize: pageSize },
  });
};

type defaultColumnStyleType = {
  sortable: boolean;
  filterable: boolean;
  headerAlign: GridAlignment;
  align: GridAlignment;
};

const defaultColumnStyle: defaultColumnStyleType = {
  sortable: false,
  filterable: false,
  headerAlign: 'left',
  align: 'left',
};

const columns: GridColDef[] = [
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

export default function InstagramCommentsTable() {
  return (
    <MetricsTable
      key="instagram-metrics"
      columns={columns}
      dataLoader={getPage}
    />
  );
}
