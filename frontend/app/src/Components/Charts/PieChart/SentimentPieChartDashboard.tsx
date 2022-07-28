import React, { useState } from 'react';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import useSentimentPieChart from './SentimentPieChartHook';
import PieChart from './PieChartAnalysis';
import useSentimentPieChartDashboard from './SentimentPieChartDashboardHook';

const SentimentPieChartDashboard = () => {
  const data = [
    { name: 'Positive', value: 0 },
    { name: 'Negative', value: 0 },
    { name: 'Neutral', value: 0 },
  ];
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const COLORS = ['#7ed472', '#203d1c', '#8bab87'];
  const { pieChartdata, isLoading, error } = useSentimentPieChartDashboard();
  // const { pieChartdata, isLoading, error } =
  //   useSentimentPieChart(AppNames.Facebook);
  console.log('error:', error);
  console.log('PieChartData:', pieChartdata);

  // for (const appName in AppNames) {
  //   const currappName: AppNames = AppNames[appName as keyof typeof AppNames];
  //   setError(error);
  //   setIsLoading(isLoading);

  //   if (pieChartdata) {
  //     data[0].value += pieChartdata.positive;
  //     data[1].value += pieChartdata.negative;
  //     data[2].value += pieChartdata.neutral;
  //   }
  // }

  if (pieChartdata) {
    data[0].value += pieChartdata.positive;
    data[1].value += pieChartdata.negative;
    data[2].value += pieChartdata.neutral;
  }

  let isDataPresent: Boolean | null =
    data[0].value > 0 || data[1].value > 0 || data[2].value > 0
      ? true
      : data[0].value === 0 || data[1].value === 0 || data[2].value === 0
      ? false
      : null;

  return (
    <PieChart
      data={data}
      isLoading={isLoading}
      error={error}
      isDataPresent={isDataPresent}
      COLORS={COLORS}
    />
  );
};

export default SentimentPieChartDashboard;
