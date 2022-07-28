import { AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery, useQueries } from 'react-query';
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
// import { DictPieChartQuery } from './PieChartQueryTypes';
import { UsePieChartQuery } from './SentimentPieChartQueryTypes';
import {
  SentimentAnalysisResponse,
  SentimentUrlRequest,
} from './SentimentUrlConst';
// import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
// import { SentimentAnalysis } from '../../../Redux/Slices/facebook/facebookSlice';

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
    pieChartQuery: '',
    appName: AppNames.GoogleReviews,
  },
  [AppNames.Yelp]: {
    pieChartQuery: '',
    appName: AppNames.Yelp,
  },
  [AppNames.default]: {
    pieChartQuery: '',
    appName: AppNames.default,
  },
};
const useSentimentPieChartDashboard = (): UsePieChartQuery => {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string | null>(null);
  let isLoading: boolean = false;
  let error: string = '';

  // const { pieChartQuery } = SentimentPieChartQuery[appName];

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
  // const arrayOfObj = Object.entries(SentimentPieChartQuery).map((e) => ( { [e[0]]: e[1] } ));
  const arrayOfObj = Object.values(SentimentPieChartDashboardQuery);

  const query = useQueries(
    arrayOfObj.map((app) => {
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
  console.log(query);
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
      //   error = extractBackendError(item.error as AxiosError<ErrorResponse>);
      if (item.error) {
        const itemError: any = item.error;
        error = itemError?.message as string;
      }
    }
  });

  //   pieChartdata: error !== null ? null : pieChartdata,

  return {
    pieChartdata: pieChartdata,
    isLoading: isLoading,
    error: error,
  };
};

export default useSentimentPieChartDashboard;
