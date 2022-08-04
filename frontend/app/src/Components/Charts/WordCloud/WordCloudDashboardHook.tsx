import { useQueries } from 'react-query';
import { useAppSelector } from '../../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import HTTP from '../../../utils/http';
import { UseWordCloudrQuery, WordCloudData } from './WordCloudQueryTypes';
import { CommentsWordCloudUrlRequest } from './WordCloudURLConst';

type WordCloudQueryType = {
  cloudQuery: string;
  appName: string;
};

type DictWordCloudQuery = {
  [key in AppNames]?: WordCloudQueryType;
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
      result = result.sort((a, b) => (a.count > b.count ? -1 : 1));
      result = result.slice(0, 40);
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
