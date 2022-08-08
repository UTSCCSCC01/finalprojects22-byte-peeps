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
  MetricsFilter,
  MetricsTableColDef,
  MetricsTables,
} from '../MetricsTable/MetricsTableQueryTypes';
import { CommentsTableColDefConst } from './CommentsTableColDefConst';
import {
  CommentsTableResponse,
  CommentsTableUrlRequest,
} from './CommentsTableUrlConst';

const commentsTables: MetricsTables = {
  [AppNames.Facebook]: {
    url: CommentsTableUrlRequest.Facebook,
    colDef: CommentsTableColDefConst.Facebook,
  },
  [AppNames.Instagram]: {
    url: CommentsTableUrlRequest.Instagram,
    colDef: CommentsTableColDefConst.Instagram,
  },
  [AppNames.Twitter]: {
    url: CommentsTableUrlRequest.Twitter,
    colDef: CommentsTableColDefConst.Twitter,
  },
  [AppNames.Reddit]: {
    url: CommentsTableUrlRequest.Reddit,
    colDef: CommentsTableColDefConst.Reddit,
  },
  [AppNames.YouTube]: {
    url: CommentsTableUrlRequest.YouTube,
    colDef: CommentsTableColDefConst.YouTube,
  },
  [AppNames.GoogleReviews]: {
    url: CommentsTableUrlRequest.GoogleReviews,
    colDef: CommentsTableColDefConst.GoogleReviews,
  },
  [AppNames.Yelp]: {
    url: CommentsTableUrlRequest.Yelp,
    colDef: CommentsTableColDefConst.Yelp,
  },
  [AppNames.Overview]: {
    url: '',
    colDef: CommentsTableColDefConst.Default,
  },
  [AppNames.default]: {
    url: '',
    colDef: CommentsTableColDefConst.Default,
  },
};

export type UseCommentsTable = {
  colDef: MetricsTableColDef;
  data: CommentsTableResponse | undefined | null;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  error: string | null;
  filterModel: MetricsFilter;
  setFilterModel: (model: MetricsFilter) => void;
};

function useCommentsTable(
  appName: AppNames,
  postId?: number
): UseCommentsTable {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState<MetricsFilter>();

  const appData = commentsTables[appName];
  const getCommentsData = async (
    url: string,
    startDate: String,
    endDate: String,
    page: number,
    pageSize: number,
    filter: MetricsFilter,
    postId?: number
  ): Promise<CommentsTableResponse> => {
    const params = postId
      ? { startDate, endDate, page, pageSize, filter, postId }
      : { startDate, endDate, page, pageSize, filter };
    return await HTTP.get(url, { params }).then((res) => res.data);
  };

  const query = useQuery<
    CommentsTableResponse,
    AxiosError<ErrorResponse>,
    CommentsTableResponse | null
  >(
    [
      'commentsTableData',
      appData.url,
      startDate,
      endDate,
      page,
      pageSize,
      filter,
      postId,
    ],
    () =>
      getCommentsData(
        appData.url,
        startDate,
        endDate,
        page,
        pageSize,
        filter,
        postId
      )
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
    filterModel: filter,
    setFilterModel: setFilter,
  };
}

export default useCommentsTable;
