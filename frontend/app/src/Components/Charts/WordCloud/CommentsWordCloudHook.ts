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
import { extractBackendError } from '../../../utils/httpHelpers';
import {
  DictWordCloudQuery,
  UseWordCloudrQuery,
  WordCloudData,
} from './WordCloudQueryTypes';
import {
  CommentsWordCloudResponse,
  CommentsWordCloudUrlRequest,
} from './WordCloudURLConst';

const wordCloudQuery: DictWordCloudQuery = {
  [AppNames.Facebook]: {
    cloudQuery: CommentsWordCloudUrlRequest.Facebook,
  },
  [AppNames.Instagram]: {
    cloudQuery: CommentsWordCloudUrlRequest.Instagram,
  },
  [AppNames.Twitter]: {
    cloudQuery: CommentsWordCloudUrlRequest.Twitter,
  },
  [AppNames.YouTube]: {
    cloudQuery: CommentsWordCloudUrlRequest.YouTube,
  },
  [AppNames.Reddit]: {
    cloudQuery: CommentsWordCloudUrlRequest.Reddit,
  },
  [AppNames.GoogleReviews]: {
    cloudQuery: CommentsWordCloudUrlRequest.GoogleReviews,
  },
  [AppNames.Yelp]: {
    cloudQuery: CommentsWordCloudUrlRequest.Yelp,
  },
  [AppNames.default]: {
    cloudQuery: '',
  },
};

function useCommentsWordCloud(): UseWordCloudrQuery {
  const appName = useAppSelector(selectAppName);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const { cloudQuery } = wordCloudQuery[appName];

  const getWordCloudData = async (): Promise<any> => {
    return await HTTP.get(cloudQuery, {
      params: {
        startDate,
        endDate,
      },
    }).then((res) => res.data);
  };

  const query = useQuery<
    CommentsWordCloudResponse,
    AxiosError<ErrorResponse>,
    WordCloudData
  >(
    ['wordCloudData', appName, startDate, endDate], // the states that change the query go here
    () => getWordCloudData()
  );

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: extractBackendError(query.error),
  };
}

export default useCommentsWordCloud;
