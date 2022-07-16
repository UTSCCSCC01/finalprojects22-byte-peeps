import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import { selectAppName } from '../../../Redux/Slices/webApp/webAppSlice';
import { ErrorResponse } from '../../../utils/enums';
import HTTP from '../../../utils/http';
import { SentimentUrlRequest } from './SentimentUrlConst';
import { DictPieChartQuery } from './PieChartQueryTypes';
import { UsePieChartQuery } from './SentimentPieChartQueryTypes';
import { SentimentAnalysisResponse } from './SentimentUrlConst';
import { SentimentAnalysis } from '../../../Redux/Slices/facebook/facebookSlice';
import { extractBackendError } from '../../../utils/httpHelpers';

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
    pieChartQuery: '',
  },
  [AppNames.Yelp]: {
    pieChartQuery: '',
  },
  [AppNames.default]: {
    pieChartQuery: '',
  },
};

const useSentimentPieChart = (): UsePieChartQuery => {
  const appName = useAppSelector(selectAppName);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const { pieChartQuery } = SentimentPieChartQuery[appName];

  const getCommentsSentimentAnalysis =
    async (): Promise<SentimentAnalysisResponse> => {
      return await HTTP.get(
        `${pieChartQuery}?start=${startDate}&end=${endDate}`
      ).then((res) => {
        return res.data;
      });
    };

  const query = useQuery<
    SentimentAnalysisResponse,
    AxiosError<ErrorResponse>,
    SentimentAnalysis | null
  >(['SentimentAnalysisData', appName, startDate, endDate], () =>
    getCommentsSentimentAnalysis()
  );
  return {
    pieChartdata: query.data,
    isLoading: query.isLoading,
    error: extractBackendError(query.error),
  };
};

export default useSentimentPieChart;
