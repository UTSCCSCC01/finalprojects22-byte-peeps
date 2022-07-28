import React from 'react';
import PieChart from './PieChartAnalysis';
import useSentimentPieChartDashboard from './SentimentPieChartDashboardHook';

const SentimentPieChartDashboard = () => {
  const data = [
    { name: 'Positive', value: 0 },
    { name: 'Negative', value: 0 },
    { name: 'Neutral', value: 0 },
  ];
  const COLORS = ['#7ed472', '#203d1c', '#8bab87'];
  const { pieChartdata, isLoading, error } = useSentimentPieChartDashboard();

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
