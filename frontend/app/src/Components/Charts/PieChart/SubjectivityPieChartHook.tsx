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
import { SubjectivityUrlRequest } from './SubjectivityUrlConst';
import { DictPieChartQuery } from './PieChartQueryTypes';
import { UseSubjectivityPieChartQuery } from './SubjectivityPieChartQueryTypes';
import { SubjectivityAnalysisResponse } from './SubjectivityUrlConst';
import { SubjectivityAnalysis } from './SubjectivityUrlConst';
import { extractBackendError } from '../../../utils/httpHelpers';

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
    pieChartQuery: '',
  },
  [AppNames.Yelp]: {
    pieChartQuery: '',
  },
  [AppNames.default]: {
    pieChartQuery: '',
  },
};

const useSubjectivityPieChart = (): UseSubjectivityPieChartQuery => {
  const appName = useAppSelector(selectAppName);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const { pieChartQuery } = SubjectivityPieChartQuery[appName];
  const getCommentsSubjectivityAnalysis =
    async (): Promise<SubjectivityAnalysisResponse> => {
      return await HTTP.get(
        `${pieChartQuery}?start=${startDate}&end=${endDate}`
      ).then((res) => {
        return res.data;
      });
    };

  const query = useQuery<
    SubjectivityAnalysisResponse,
    AxiosError<ErrorResponse>,
    SubjectivityAnalysis | null
  >(['SubjectivityAnalysisData', appName, startDate, endDate], () =>
    getCommentsSubjectivityAnalysis()
  );
  return {
    pieChartData: query.data,
    isLoading: query.isLoading,
    error: extractBackendError(query.error),
  };
};

export default useSubjectivityPieChart;
