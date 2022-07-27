import { AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import { ErrorResponse } from '../../../utils/enums';
import HTTP from '../../../utils/http';
import { extractBackendError } from '../../../utils/httpHelpers';
import {
  MetricsTableColDef,
  MetricsTables,
} from '../MetricsTable/MetricsTableQueryTypes';
import { PostsTableColDefConst } from './PostsTableColDefConst';
import { PostsTableResponse, PostsTableUrlRequest } from './PostsTableUrlConst';

const postsTables: MetricsTables = {
  [AppNames.Facebook]: {
    url: '',
    colDef: PostsTableColDefConst.Default,
  },
  [AppNames.Instagram]: {
    url: '',
    colDef: PostsTableColDefConst.Default,
  },
  [AppNames.Twitter]: {
    url: '',
    colDef: PostsTableColDefConst.Default,
  },
  [AppNames.Reddit]: {
    url: PostsTableUrlRequest.Reddit,
    colDef: PostsTableColDefConst.Reddit,
  },
  [AppNames.YouTube]: {
    url: '',
    colDef: PostsTableColDefConst.Default,
  },
  [AppNames.GoogleReviews]: {
    url: '',
    colDef: PostsTableColDefConst.Default,
  },
  [AppNames.Yelp]: {
    url: '',
    colDef: PostsTableColDefConst.Default,
  },
  [AppNames.default]: {
    url: '',
    colDef: PostsTableColDefConst.Default,
  },
};

export type UsePostsTable = {
  colDef: MetricsTableColDef;
  data: PostsTableResponse | undefined | null;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  error: string | null;
};

function usePostsTable(appName: AppNames, postId?: number): UsePostsTable {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const appData = postsTables[appName];
  const getPostsData = async (
    startDate: String,
    endDate: String,
    page: number,
    pageSize: number
  ): Promise<PostsTableResponse> => {
    const params = { startDate, endDate, page, pageSize };
    return await HTTP.get(appData.url, { params }).then((res: any) => res.data);
  };

  const query = useQuery<
    PostsTableResponse,
    AxiosError<ErrorResponse>,
    PostsTableResponse | null
  >(['postsTableData', startDate, endDate, page, pageSize], () =>
    getPostsData(startDate, endDate, page, pageSize)
  );

  return {
    colDef: appData.colDef,
    data: query.data,
    isLoading: query.isLoading,
    page: page,
    setPage: setPage,
    pageSize: pageSize,
    setPageSize: setPageSize,
    error: extractBackendError(query.error),
  };
}

export default usePostsTable;
