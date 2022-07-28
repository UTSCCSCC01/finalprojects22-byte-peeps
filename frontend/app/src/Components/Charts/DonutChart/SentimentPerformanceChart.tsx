import React from 'react';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import useSentimentPerformance from './SentimentPerformanceHook';
import CircularProgressChart from './CircularProgressChart';
import { Percent } from '@mui/icons-material';
import './SentimentPerformanceChart.css';
import Loader from '../../Loader/Loader';
import NoData from '../../NoData/NoData';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const SentimentPerformanceChart = () => {
  const { sentimentPerformanceData, resultCount, isLoading, error } =
    useSentimentPerformance();

  console.log('performance:', sentimentPerformanceData);
  console.log('keys:', Object.keys(AppNames));
  return isLoading ? (
    <Loader />
  ) : resultCount !== 0 ? (
    <div className="wrapper-chart">
      {Object.keys(AppNames).map((item, idx) => {
        if (sentimentPerformanceData[idx] !== -1) {
          return (
            <CircularProgressChart
              appName={item}
              percentage={sentimentPerformanceData[idx]}
            />
          );
        }
      })}
    </div>
  ) : resultCount === 0 && error === '' ? (
    <NoData className="noData center" />
  ) : (
    <ErrorMessage error={error} />
  );
};

export default SentimentPerformanceChart;
