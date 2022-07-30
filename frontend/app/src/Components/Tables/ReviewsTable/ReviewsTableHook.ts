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
import { ReviewsTableColDefConst } from './ReviewsTableColDefConst';
import {
  ReviewsTableResponse,
  ReviewsTableUrlRequest,
} from './ReviewsTableUrlConst';

const reviewsTables: MetricsTables = {
  [AppNames.Facebook]: {
    url: '',
    colDef: ReviewsTableColDefConst.Default,
  },
  [AppNames.Instagram]: {
    url: '',
    colDef: ReviewsTableColDefConst.Default,
  },
  [AppNames.Twitter]: {
    url: '',
    colDef: ReviewsTableColDefConst.Default,
  },
  [AppNames.Reddit]: {
    url: '',
    colDef: ReviewsTableColDefConst.Default,
  },
  [AppNames.YouTube]: {
    url: '',
    colDef: ReviewsTableColDefConst.Default,
  },
  [AppNames.GoogleReviews]: {
    url: ReviewsTableUrlRequest.GoogleReviews,
    colDef: ReviewsTableColDefConst.GoogleReviews,
  },
  [AppNames.Yelp]: {
    url: ReviewsTableUrlRequest.Yelp,
    colDef: ReviewsTableColDefConst.Yelp,
  },
  [AppNames.default]: {
    url: '',
    colDef: ReviewsTableColDefConst.Default,
  },
};

export type UseReviewsTable = {
  colDef: MetricsTableColDef;
  data: ReviewsTableResponse | undefined | null;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  error: string | null;
  filterModel: MetricsFilter;
  setFilterModel: (model: MetricsFilter) => void;
};

function useReviewsTable(
  appName: AppNames,
  reviewId?: number
): UseReviewsTable {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState<MetricsFilter>();

  const appData = reviewsTables[appName];
  const getReviewsData = async (
    startDate: String,
    endDate: String,
    page: number,
    pageSize: number,
    filter: MetricsFilter,
    reviewId?: number
  ): Promise<ReviewsTableResponse> => {
    const params = reviewId
      ? { startDate, endDate, page, pageSize, filter, reviewId }
      : { startDate, endDate, page, pageSize, filter };
    return await HTTP.get(appData.url, { params }).then((res) => res.data);
  };

  const query = useQuery<
    ReviewsTableResponse,
    AxiosError<ErrorResponse>,
    ReviewsTableResponse | null
  >(
    ['reviewsTableData', startDate, endDate, page, pageSize, filter, reviewId],
    () => getReviewsData(startDate, endDate, page, pageSize, filter, reviewId)
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

export default useReviewsTable;
