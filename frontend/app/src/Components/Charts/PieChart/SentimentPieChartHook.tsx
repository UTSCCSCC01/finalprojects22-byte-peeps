import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
import { SentimentAnalysis } from '../../../Redux/Slices/facebook/facebookSlice';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import { ErrorResponse } from '../../../utils/enums';
import HTTP from '../../../utils/http';
import { extractBackendError } from '../../../utils/httpHelpers';
import { DictPieChartQuery } from './PieChartQueryTypes';
import { UsePieChartQuery } from './SentimentPieChartQueryTypes';
import {
  SentimentAnalysisResponse,
  SentimentUrlRequest,
} from './SentimentUrlConst';

const SentimentPieChartQuery: DictPieChartQuery = {
  [AppNames.Facebook]: {
    pieChartQuery: SentimentUrlRequest.Facebook,
  },
  [AppNames.Instagram]: {
    pieChartQuery: SentimentUrlRequest.Instagram,
  },
  [AppNames.Twitter]: {
    pieChartQuery: SentimentUrlRequest.Twitter,
  },
  [AppNames.YouTube]: {
    pieChartQuery: SentimentUrlRequest.YouTube,
  },
  [AppNames.Reddit]: {
    pieChartQuery: SentimentUrlRequest.Reddit,
  },
  [AppNames.GoogleReviews]: {
    pieChartQuery: SentimentUrlRequest.GoogleReviews,
  },
  [AppNames.Yelp]: {
    pieChartQuery: SentimentUrlRequest.Yelp,
  },
  [AppNames.Overview]: {
    pieChartQuery: '',
  },
  [AppNames.default]: {
    pieChartQuery: '',
  },
};

const useSentimentPieChart = (
  appName: AppNames,
  postId?: number
): UsePieChartQuery => {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const { pieChartQuery } = SentimentPieChartQuery[appName];

  const getCommentsSentimentAnalysis = async (
    startDate: String,
    endDate: String,
    postId?: number
  ): Promise<SentimentAnalysisResponse> => {
    const params = postId
      ? { startDate, endDate, postId }
      : { startDate, endDate };
    return await HTTP.get(pieChartQuery, { params }).then((res) => {
      return res.data;
    });
  };

  const query = useQuery<
    SentimentAnalysisResponse,
    AxiosError<ErrorResponse>,
    SentimentAnalysis | null
  >(['SentimentAnalysisData', appName, startDate, endDate, postId], () =>
    getCommentsSentimentAnalysis(startDate, endDate, postId)
  );

  return {
    pieChartdata: query.data,
    isLoading: query.isLoading,
    error: extractBackendError(query.error),
  };
};

export default useSentimentPieChart;
