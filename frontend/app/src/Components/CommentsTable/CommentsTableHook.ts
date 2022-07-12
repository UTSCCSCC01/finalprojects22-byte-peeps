import { AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../Redux/Slices/dateSelector/dateSelectorSlice';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { selectAppName } from '../../Redux/Slices/webApp/webAppSlice';
import { ErrorResponse } from '../../utils/enums';
import HTTP from '../../utils/http';
import { extractBackendError } from '../../utils/httpHelpers';
import { CommentsTableColDefConst } from './CommentsTableColDefConst';
import {
  CommentsTableColDef,
  CommentTables
} from './CommentsTableQueryTypes';
import {
  CommentsTableResponse,
  CommentsTableUrlRequest,
} from './CommentsTableUrlConst';

const commentsTables: CommentTables = {
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
    url: '',
    colDef: CommentsTableColDefConst.Default,
  },
  [AppNames.Yelp]: {
    url: '',
    colDef: CommentsTableColDefConst.Default,
  },
  [AppNames.default]: {
    url: '',
    colDef: CommentsTableColDefConst.Default,
  },
};

export type UseCommentsTable = {
  colDef: CommentsTableColDef;
  data: CommentsTableResponse | undefined | null;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  error: string | null;
};

function useCommentsTable(): UseCommentsTable {
  const appName = useAppSelector(selectAppName);

  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const appData = commentsTables[appName];
  const getCommentsData = async (
    startDate: String,
    endDate: String,
    page: number,
    pageSize: number
  ): Promise<CommentsTableResponse> => {
    console.log(appName);
    return await HTTP.get(appData.url, {
      params: { startDate, endDate, page, pageSize },
    }).then((res) => res.data);
  };

  const query = useQuery<
    CommentsTableResponse,
    AxiosError<ErrorResponse>,
    CommentsTableResponse | null
  >(['commentsTableData', startDate, endDate, page, pageSize],
    () => getCommentsData(startDate, endDate, page, pageSize)
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

export default useCommentsTable;