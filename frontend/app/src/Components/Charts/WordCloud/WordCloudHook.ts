import { AxiosError } from 'axios';
import { AnyRecord } from 'dns';
import React from 'react';
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
// import { TagData } from './WordCloudData';
import { UseWordCloudrQuery, DictWordCloudQuery } from './WordCloudQueryTypes';
import { WordCloudResponse, WordCloudUrlRequest } from './WordCloudURLConst';
import { WordCloudData } from './WordCloudQueryTypes';

const wordCloudQuery: DictWordCloudQuery = {
  [AppNames.Facebook]: {
    cloudQuery: WordCloudUrlRequest.Facebook,
  },
  [AppNames.Instagram]: {
    cloudQuery: WordCloudUrlRequest.Instagram,
  },
  [AppNames.Twitter]: {
    cloudQuery: WordCloudUrlRequest.Twitter,
  },
  [AppNames.YouTube]: {
    cloudQuery: WordCloudUrlRequest.YouTube,
  },
  [AppNames.Reddit]: {
    cloudQuery: WordCloudUrlRequest.Reddit,
  },
  [AppNames.GoogleReviews]: {
    cloudQuery: WordCloudUrlRequest.GoogleReviews,
  },
  [AppNames.Yelp]: {
    cloudQuery: WordCloudUrlRequest.Yelp,
  },
  [AppNames.default]: {
    cloudQuery: '',
  },
};

function useWordCloud(): UseWordCloudrQuery {
  const appName = useAppSelector(selectAppName);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const cloudQuery = wordCloudQuery[appName];

  const getWordCloudData = async (): Promise<WordCloudResponse> => {
    return await HTTP.get(
      `${cloudQuery}?start=${startDate}&end=${endDate}`
    ).then((res) => res.data);
  };

  const query = useQuery<
    WordCloudResponse,
    AxiosError<ErrorResponse>,
    WordCloudData | null
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

export default useWordCloud;
