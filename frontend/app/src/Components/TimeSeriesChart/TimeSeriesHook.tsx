import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../Redux/Slices/dateSelector/dateSelectorSlice';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { ErrorResponse } from '../../utils/enums';
import HTTP from '../../utils/http';
import { extractBackendError } from '../../utils/httpHelpers';
import { TimeSeriesResponse, TimeSeriesUrlRequest } from './TimeSeriesUrlConst';

export type UseTimeSeriesTable = {
  data: TimeSeriesResponse;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
};
const timeSeriesTable = {
  [AppNames.Facebook]: {
    url: TimeSeriesUrlRequest.Facebook,
  },
  [AppNames.Instagram]: {
    url: TimeSeriesUrlRequest.Instagram,
  },
  [AppNames.Twitter]: {
    url: TimeSeriesUrlRequest.Twitter,
  },
  [AppNames.Reddit]: {
    url: TimeSeriesUrlRequest.Reddit,
  },
  [AppNames.YouTube]: {
    url: TimeSeriesUrlRequest.YouTube,
  },
  [AppNames.GoogleReviews]: {
    url: TimeSeriesUrlRequest.Empty,
  },
  [AppNames.Yelp]: {
    url: TimeSeriesUrlRequest.Empty,
  },
  [AppNames.default]: {
    url: TimeSeriesUrlRequest.Empty,
  },
};

export function useTimeSeriesTable(appName: AppNames): UseTimeSeriesTable {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const appData = timeSeriesTable[appName];

  const getAnalysis = async (): Promise<TimeSeriesResponse> => {
    return await HTTP.get(appData.url, {
      params: {
        start: startDate.split('T')[0].replaceAll('-', ''),
        end: endDate.split('T')[0].replaceAll('-', ''),
      },
    }).then((res) => res.data);
  };

  const query = useQuery<
    TimeSeriesResponse,
    AxiosError<ErrorResponse>,
    TimeSeriesResponse | null
  >([startDate, endDate], getAnalysis);
  return {
    data: query.data || { data: [] },
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    error: extractBackendError(query.error),
  };
}
