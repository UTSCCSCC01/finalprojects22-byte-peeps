import { GridColDef } from '@mui/x-data-grid';
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

const columns: GridColDef[] = [
  {
    field: 'userName',
    headerName: 'Name',
    sortable: false,
    filterable: false,
  },
  {
    field: 'message',
    headerName: 'Comment',
    sortable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: 'likes',
    headerName: 'Likes',
    type: 'number',
    sortable: false,
    filterable: false,
  },
  {
    field: 'sentimentAnalysis',
    headerName: 'Sentiment',
    sortable: false,
    filterable: false,
  },
  {
    field: 'subjectivityAnalysis',
    headerName: 'Subjectivity',
    sortable: false,
    filterable: false,
  },
  {
    field: 'topicClassification',
    headerName: 'Topic',
    sortable: false,
    filterable: false,
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
