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
  SubjectivityAnalysis,
  SubjectivityAnalysisResponse,
  SubjectivityUrlRequest,
} from './SubjectivityUrlConst';

type PieChartQueryType = {
  pieChartQuery: string;
  appName: string;
};

type DictPieChartQuery = {
  [key in AppNames]: PieChartQueryType;
};

const SubjectivityPieChartDashboardQuery: DictPieChartQuery = {
  [AppNames.Facebook]: {
    pieChartQuery: SubjectivityUrlRequest.Facebook,
    appName: AppNames.Facebook,
  },
  [AppNames.Instagram]: {
    pieChartQuery: SubjectivityUrlRequest.Instagram,
    appName: AppNames.Instagram,
  },
  [AppNames.Twitter]: {
    pieChartQuery: SubjectivityUrlRequest.Twitter,
    appName: AppNames.Twitter,
  },
  [AppNames.YouTube]: {
    pieChartQuery: SubjectivityUrlRequest.YouTube,
    appName: AppNames.YouTube,
  },
  [AppNames.Reddit]: {
    pieChartQuery: SubjectivityUrlRequest.Reddit,
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

const useSubjectivityPieChartDashboard = () => {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string | null>(null);
  let isLoading: boolean = false;
  let error: string = '';

  // const { pieChartQuery } = SentimentPieChartQuery[appName];

  const getCommentsSubjectivityAnalysis = async (
    startDate: String,
    endDate: String,
    pieChartQuery: string,
    postId?: number
  ): Promise<SubjectivityAnalysisResponse> => {
    const params = postId
      ? { startDate, endDate, postId }
      : { startDate, endDate };
    return await HTTP.get(pieChartQuery, { params }).then((res) => {
      return res.data;
    });
  };
  // const arrayOfObj = Object.entries(SentimentPieChartQuery).map((e) => ( { [e[0]]: e[1] } ));
  const arrayOfObj = Object.values(SubjectivityPieChartDashboardQuery);

  const query = useQueries(
    arrayOfObj.map((app) => {
      return {
        queryKey: [
          'SubjectivityAnalysisData',
          app.appName,
          startDate,
          endDate,
          app.pieChartQuery,
        ],
        queryFn: () =>
          getCommentsSubjectivityAnalysis(
            startDate,
            endDate,
            app.pieChartQuery
          ),
      };
    })
  );
  console.log(query);
  let pieChartdata: SubjectivityAnalysis = {
    subjective: 0,
    objective: 0,
  };
  query.forEach((item) => {
    if (item.data) {
      pieChartdata.subjective += item.data.subjective;
      pieChartdata.objective += item.data.objective;
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

export default useSubjectivityPieChartDashboard;
