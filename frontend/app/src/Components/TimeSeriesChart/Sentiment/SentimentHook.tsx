import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import { ErrorResponse } from '../../../utils/enums';

import { extractBackendError } from '../../../utils/httpHelpers';
import { TimeSeriesResponse, SentimentUrlRequest } from './SentimentUrlConst';

export type UseTimeSeriesTable = {
  data: TimeSeriesResponse;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
};
const timeSeriesTable = {
  [AppNames.Facebook]: {
    url: SentimentUrlRequest.Facebook,
  },
  [AppNames.Instagram]: {
    url: SentimentUrlRequest.Instagram,
  },
  [AppNames.Twitter]: {
    url: SentimentUrlRequest.Twitter,
  },
  [AppNames.Reddit]: {
    url: SentimentUrlRequest.Reddit,
  },
  [AppNames.YouTube]: {
    url: SentimentUrlRequest.YouTube,
  },
  [AppNames.GoogleReviews]: {
    url: SentimentUrlRequest.Empty,
  },
  [AppNames.Yelp]: {
    url: SentimentUrlRequest.Empty,
  },
  [AppNames.Overview]: {
    url: SentimentUrlRequest.Empty,
  },
  [AppNames.default]: {
    url: SentimentUrlRequest.Empty,
  },
};
const HTTP = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  withCredentials: true,
});
export function useTimeSeriesSentiment(appName: AppNames): UseTimeSeriesTable {
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
  >([startDate, endDate, 'sentiment'], getAnalysis);
  return {
    data: query.data || { data: [] },
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    error: extractBackendError(query.error),
  };
}
