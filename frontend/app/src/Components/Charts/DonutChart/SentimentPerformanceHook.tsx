import React from 'react';
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
import { UsePieChartQuery } from '.././PieChart/SentimentPieChartQueryTypes';
import {
  SentimentAnalysisResponse,
  SentimentUrlRequest,
} from '../PieChart/SentimentUrlConst';
import SentimentPieChartDashboard from '../PieChart/SentimentPieChartDashboard';
import { totalmem } from 'os';

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

  const arrayOfObj = Object.values(SentimentPerformanceQuery);

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
  const result: number[] = [];
  let resultCount = 0;
  query.forEach((item) => {
    if (item.data) {
      const total = item.data.positive + item.data.negative;
      result.push(+((item.data.positive / total) * 100).toFixed(2));
      resultCount += 1;
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
