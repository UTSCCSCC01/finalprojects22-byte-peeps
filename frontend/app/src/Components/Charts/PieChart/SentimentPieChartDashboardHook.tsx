import { useQueries } from 'react-query';
import { useAppSelector } from '../../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
import { SentimentAnalysis } from '../../../Redux/Slices/facebook/facebookSlice';
import HTTP from '../../../utils/http';
import { UsePieChartQuery } from './SentimentPieChartQueryTypes';
import {
  SentimentAnalysisResponse,
  SentimentUrlRequest,
} from './SentimentUrlConst';
import { AppNames } from '../DonutChart/SentimentPerformanceHook';

type PieChartQueryType = {
  pieChartQuery: string;
  appName: string;
};

type DictPieChartQuery = {
  [key in AppNames]: PieChartQueryType;
};

const SentimentPieChartDashboardQuery: DictPieChartQuery = {
  [AppNames.Facebook]: {
    pieChartQuery: SentimentUrlRequest.Facebook,
    appName: AppNames.Facebook,
  },
  [AppNames.Instagram]: {
    pieChartQuery: SentimentUrlRequest.Instagram,
    appName: AppNames.Instagram,
  },
  [AppNames.Twitter]: {
    pieChartQuery: SentimentUrlRequest.Twitter,
    appName: AppNames.Twitter,
  },
  [AppNames.YouTube]: {
    pieChartQuery: SentimentUrlRequest.YouTube,
    appName: AppNames.YouTube,
  },
  [AppNames.Reddit]: {
    pieChartQuery: SentimentUrlRequest.Reddit,
    appName: AppNames.Reddit,
  },
  [AppNames.GoogleReviews]: {
    pieChartQuery: SentimentUrlRequest.GoogleReviews,
    appName: AppNames.GoogleReviews,
  },
  [AppNames.Yelp]: {
    pieChartQuery: SentimentUrlRequest.Yelp,
    appName: AppNames.Yelp,
  },
};
const useSentimentPieChartDashboard = (): UsePieChartQuery => {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  let isLoading: boolean = false;
  let error: string = '';

  const getCommentsSentimentAnalysis = async (
    startDate: String,
    endDate: String,
    pieChartQuery: string,
    postId?: number
  ): Promise<SentimentAnalysisResponse> => {
    const params = postId
      ? { startDate, endDate, postId }
      : { startDate, endDate };
    return await HTTP.get(pieChartQuery, { params }).then((res) => {
      return res.data;
    });
  };
  const queries = Object.values(SentimentPieChartDashboardQuery);

  const query = useQueries(
    queries.map((app) => {
      return {
        queryKey: [
          'SentimentAnalysisData',
          app.appName,
          startDate,
          endDate,
          app.pieChartQuery,
        ],
        queryFn: () =>
          getCommentsSentimentAnalysis(startDate, endDate, app.pieChartQuery),
      };
    })
  );
  let pieChartdata: SentimentAnalysis = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };
  query.forEach((item) => {
    if (item.data) {
      pieChartdata.positive += item.data.positive;
      pieChartdata.negative += item.data.negative;
      pieChartdata.neutral += item.data.neutral;
    } else {
      isLoading = item.isLoading;
      if (item.error) {
        const itemError: any = item.error;
        error = itemError?.message as string;
      }
    }
  });

  return {
    pieChartdata: pieChartdata,
    isLoading: isLoading,
    error: error === '' ? null : error,
  };
};

export default useSentimentPieChartDashboard;
