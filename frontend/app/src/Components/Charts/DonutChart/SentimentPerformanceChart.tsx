import React from 'react';
import { AppNames } from './SentimentPerformanceHook';
import useSentimentPerformance from './SentimentPerformanceHook';
import CircularProgressChart from './CircularProgressChart';
import './SentimentPerformanceChart.css';
import Loader from '../../Loader/Loader';
import NoData from '../../NoData/NoData';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const SentimentPerformanceChart = () => {
  const { sentimentPerformanceData, resultCount, isLoading, error } =
    useSentimentPerformance();

  return isLoading ? (
    <Loader />
  ) : resultCount !== 0 ? (
    <div className="wrapper-chart">
      {Object.values(AppNames).map((item, idx) => {
        if (sentimentPerformanceData[idx] !== -1) {
          return (
            <CircularProgressChart
              key={idx}
              appName={item}
              percentage={sentimentPerformanceData[idx]}
            />
          );
        }
        return null;
      })}
    </div>
  ) : resultCount === 0 && error === '' ? (
    <NoData className="noData center" />
  ) : (
    <ErrorMessage error={error} />
  );
};

export default SentimentPerformanceChart;