import React from 'react';
import PieChart, { PieChartAnalysisProps } from './PieChartAnalysis';
import { SubjectivityAnalysisColors } from '../../../utils/enums';
import useSubjectivityPieChart from './SubjectivityPieChartHook';

interface Props {
  postId?: number;
}

const SubjectivityPieChartWrapper: React.FC<Props> = (props) => {
  const { pieChartData, isLoading, error } = useSubjectivityPieChart(
    props.postId
  );

  const data = [
    { name: 'Subjective', value: 0 },
    { name: 'Objective', value: 0 },
  ];

  let isDataPresent: Boolean | null = null;

  if (pieChartData) {
    data[0].value = pieChartData.subjective;
    data[1].value = pieChartData.objective;
    isDataPresent =
      data[0].value > 0 || data[1].value > 0
        ? true
        : data[0].value === 0 || data[1].value === 0 || data[2].value === 0
        ? false
        : null;
  }

  const COLORS = [
    SubjectivityAnalysisColors.Subjective,
    SubjectivityAnalysisColors.Objective,
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

export default SubjectivityPieChartWrapper;
