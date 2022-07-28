import { useQueries } from 'react-query';
import { useAppSelector } from '../../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
import HTTP from '../../../utils/http';
import {
  SubjectivityAnalysis,
  SubjectivityAnalysisResponse,
  SubjectivityUrlRequest,
} from './SubjectivityUrlConst';
import { AppNames } from '../DonutChart/SentimentPerformanceHook';

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
};

const useSubjectivityPieChartDashboard = () => {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  let isLoading: boolean = false;
  let error: string = '';

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
  const queries = Object.values(SubjectivityPieChartDashboardQuery);

  const query = useQueries(
    queries.map((app) => {
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
