import React from 'react';
import PieChart, { PieChartAnalysisProps } from './PieChartAnalysis';
import { SentimentAnalysisColors } from '../../../utils/enums';
import useSentimentPieChart from './SentimentPieChartHook';

interface Props {
  postId?: number;
}

const PieChartWrapper: React.FC<Props> = (props) => {
  const { pieChartdata, isLoading, error } = useSentimentPieChart(props.postId);

  const data = [
    { name: 'Positve', value: 0 },
    { name: 'Negative', value: 0 },
    { name: 'Neutral', value: 0 },
  ];

  let isDataPresent: Boolean | null = null;

  if (pieChartdata) {
    data[0].value = pieChartdata.positive;
    data[1].value = pieChartdata.negative;
    data[2].value = pieChartdata.neutral;
    isDataPresent =
      data[0].value > 0 || data[1].value > 0 || data[2].value > 0
        ? true
        : data[0].value === 0 || data[1].value === 0 || data[2].value === 0
        ? false
        : null;
  }

  const COLORS = [
    SentimentAnalysisColors.Positive,
    SentimentAnalysisColors.Neutral,
    SentimentAnalysisColors.Negative,
  ];

  return (
    <>
      <PieChart
        data={data}
        isLoading={isLoading}
        error={error}
        isDataPresent={isDataPresent}
        COLORS={COLORS}
      />
    </>
  );
};

export default PieChartWrapper;
