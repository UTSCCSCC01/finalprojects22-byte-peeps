import { SentimentAnalysis } from '../../../Redux/Slices/facebook/facebookSlice';

export type UsePieChartQuery = {
  pieChartdata: SentimentAnalysis | undefined | null;
  isLoading: boolean;
  error: string | null;
};
