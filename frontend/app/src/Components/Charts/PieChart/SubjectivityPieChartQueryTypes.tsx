import { SubjectivityAnalysis } from './SubjectivityUrlConst';

export type UseSubjectivityPieChartQuery = {
  pieChartData: SubjectivityAnalysis | undefined | null;
  isLoading: boolean;
  error: string | null;
};
