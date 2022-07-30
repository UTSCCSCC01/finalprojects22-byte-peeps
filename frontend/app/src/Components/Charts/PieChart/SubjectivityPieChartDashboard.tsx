import React from 'react';
import { SubjectivityAnalysisColors } from '../../../utils/enums';
import PieChart from './PieChartAnalysis';
import useSubjectivityPieChartDashboard from './SubjectivityPieChartDashboardHook';

const SubjectivityPieChartDashboard = () => {
  const data = [
    { name: 'Subjective', value: 0 },
    { name: 'Objective', value: 0 },
  ];

  const COLORS = [
    SubjectivityAnalysisColors.Subjective,
    SubjectivityAnalysisColors.Objective,
  ];
  const { pieChartdata, isLoading, error } = useSubjectivityPieChartDashboard();

  let isDataPresent: Boolean | null = null;

  if (pieChartdata) {
    data[0].value += pieChartdata.subjective;
    data[1].value += pieChartdata.objective;
    isDataPresent =
      data[0].value > 0 || data[1].value > 0
        ? true
        : data[0].value === 0 || data[1].value === 0
        ? false
        : null;
  }

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

export default SubjectivityPieChartDashboard;