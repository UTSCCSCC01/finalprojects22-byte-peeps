import { AxiosError } from 'axios';
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
import { DictPieChartQuery } from './PieChartQueryTypes';
import { UseSubjectivityPieChartQuery } from './SubjectivityPieChartQueryTypes';
import {
  SubjectivityAnalysis,
  SubjectivityAnalysisResponse,
  SubjectivityUrlRequest,
} from './SubjectivityUrlConst';

const SubjectivityPieChartQuery: DictPieChartQuery = {
  [AppNames.Facebook]: {
    pieChartQuery: SubjectivityUrlRequest.Facebook,
  },
  [AppNames.Instagram]: {
    pieChartQuery: SubjectivityUrlRequest.Instagram,
  },
  [AppNames.Twitter]: {
    pieChartQuery: SubjectivityUrlRequest.Twitter,
  },
  [AppNames.YouTube]: {
    pieChartQuery: SubjectivityUrlRequest.YouTube,
  },
  [AppNames.Reddit]: {
    pieChartQuery: SubjectivityUrlRequest.Reddit,
  },
  [AppNames.GoogleReviews]: {
    pieChartQuery: SubjectivityUrlRequest.GoogleReviews,
  },
  [AppNames.Yelp]: {
    pieChartQuery: SubjectivityUrlRequest.Yelp,
  },
  [AppNames.default]: {
    pieChartQuery: '',
  },
};

const useSubjectivityPieChart = (
  appName: AppNames,
  postId?: number
): UseSubjectivityPieChartQuery => {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const { pieChartQuery } = SubjectivityPieChartQuery[appName];
  const getCommentsSubjectivityAnalysis = async (
    startDate: String,
    endDate: String,
    postId?: number
  ): Promise<SubjectivityAnalysisResponse> => {
    const params = postId
      ? { startDate, endDate, postId }
      : { startDate, endDate };
    return await HTTP.get(pieChartQuery, { params }).then((res) => {
      return res.data;
    });
  };

  const query = useQuery<
    SubjectivityAnalysisResponse,
    AxiosError<ErrorResponse>,
    SubjectivityAnalysis | null
  >(['SubjectivityAnalysisData', appName, startDate, endDate, postId], () =>
    getCommentsSubjectivityAnalysis(startDate, endDate, postId)
  );

  return {
    pieChartData: query.data,
    isLoading: query.isLoading,
    error: extractBackendError(query.error),
  };
};

export default useSubjectivityPieChart;
