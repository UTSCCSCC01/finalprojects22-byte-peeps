import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import { SentimentAnalysis } from '../../../Redux/Slices/facebook/facebookSlice';
// import { / } from './SentimentUrlConst';

type PieChartQueryType = {
  pieChartQuery: string;
};

export type DictPieChartQuery = {
  [key in AppNames]: PieChartQueryType;
};

export type UsePieChartQuery = {
  pieChartdata: SentimentAnalysis | undefined | null;
  isLoading: boolean;
  error: string | null;
};
