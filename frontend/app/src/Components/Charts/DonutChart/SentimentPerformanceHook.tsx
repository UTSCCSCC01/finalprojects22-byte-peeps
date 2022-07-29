import { useQueries } from 'react-query';
import { useAppSelector } from '../../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
import HTTP from '../../../utils/http';
import {
  SentimentAnalysisResponse,
  SentimentUrlRequest,
} from '../PieChart/SentimentUrlConst';

export enum AppNames {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Twitter = 'Twitter',
  YouTube = 'YouTube',
  Reddit = 'Reddit',
  GoogleReviews = 'Google Reviews',
  Yelp = 'Yelp',
}

type PieChartQueryType = {
  pieChartQuery: string;
  appName: string;
};

type DictPieChartQuery = {
  [key in AppNames]: PieChartQueryType;
};

const SentimentPerformanceQuery: DictPieChartQuery = {
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

const useSentimentPerformance = () => {
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

  const queries = Object.values(SentimentPerformanceQuery);

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
  const result: number[] = [];
  let resultCount = 0;
  query.forEach((item) => {
    if (item.data) {
      let total = item.data.positive + item.data.negative;
      if (total === 0) {
        total = 1;
      } else {
        resultCount += 1;
      }
      result.push(+((item.data.positive / total) * 100).toFixed(2));
    } else {
      result.push(-1);
      isLoading = item.isLoading;
      if (item.error) {
        const itemError: any = item.error;
        error = itemError?.message as string;
      }
    }
  });

  return {
    sentimentPerformanceData: result,
    resultCount,
    isLoading: isLoading,
    error: error,
  };
};

export default useSentimentPerformance;
