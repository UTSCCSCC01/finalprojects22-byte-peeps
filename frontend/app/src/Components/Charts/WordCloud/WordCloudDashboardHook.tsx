import { queries } from '@testing-library/react';
import { AxiosError } from 'axios';
import { useQueries, useQuery } from 'react-query';
import { useAppSelector } from '../../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
// import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import { ErrorResponse } from '../../../utils/enums';
import HTTP from '../../../utils/http';
import { extractBackendError } from '../../../utils/httpHelpers';
import { UseWordCloudrQuery, WordCloudData } from './WordCloudQueryTypes';
import {
  CommentsWordCloudResponse,
  CommentsWordCloudUrlRequest,
} from './WordCloudURLConst';

export enum AppNames {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Twitter = 'Twitter',
  YouTube = 'YouTube',
  Reddit = 'Reddit',
  GoogleReviews = 'Google Reviews',
  Yelp = 'Yelp',
}

type WordCloudQueryType = {
  cloudQuery: string;
  appName: string;
};

type DictWordCloudQuery = {
  [key in AppNames]: WordCloudQueryType;
};

const wordCloudQuery: DictWordCloudQuery = {
  [AppNames.Facebook]: {
    cloudQuery: CommentsWordCloudUrlRequest.Facebook,
    appName: AppNames.Facebook,
  },
  [AppNames.Instagram]: {
    cloudQuery: CommentsWordCloudUrlRequest.Instagram,
    appName: AppNames.Instagram,
  },
  [AppNames.Twitter]: {
    cloudQuery: CommentsWordCloudUrlRequest.Twitter,
    appName: AppNames.Twitter,
  },
  [AppNames.YouTube]: {
    cloudQuery: CommentsWordCloudUrlRequest.YouTube,
    appName: AppNames.YouTube,
  },
  [AppNames.Reddit]: {
    cloudQuery: CommentsWordCloudUrlRequest.Reddit,
    appName: AppNames.Reddit,
  },
  [AppNames.GoogleReviews]: {
    cloudQuery: CommentsWordCloudUrlRequest.GoogleReviews,
    appName: AppNames.GoogleReviews,
  },
  [AppNames.Yelp]: {
    cloudQuery: CommentsWordCloudUrlRequest.Yelp,
    appName: AppNames.Yelp,
  },
};

const useCommentsWordCloud = (): UseWordCloudrQuery => {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  let result: WordCloudData = [];
  let isLoading: boolean = false;
  let error: string = '';

  const getWordCloudData = async (
    startDate: String,
    endDate: String,
    cloudQuery: string
  ): Promise<any> => {
    return await HTTP.get(cloudQuery, {
      params: {
        startDate,
        endDate,
      },
    }).then((res) => res.data);
  };

  const queries = Object.values(wordCloudQuery);

  const query = useQueries(
    queries.map((app) => {
      console.log('app:' + JSON.stringify(app));
      return {
        queryKey: [
          'WordCloudData',
          app.appName,
          startDate,
          endDate,
          app.cloudQuery,
        ],
        queryFn: () => getWordCloudData(startDate, endDate, app.cloudQuery),
      };
    })
  );

  query.forEach((item) => {
    if (item.data) {
      result = result.concat(item.data);
      result = result.filter(
        (phrase, index, self) =>
          index === self.findIndex((t) => t.value === phrase.value)
      ); //removes duplicates
      result = result.slice(0, 9);
    } else {
      isLoading = item.isLoading;
      if (item.error) {
        const itemError: any = item.error;
        error = itemError?.message as string;
      }
    }
  });

  return {
    data: result,
    isLoading: isLoading,
    error: error === '' ? null : error,
  };
};

export default useCommentsWordCloud;
