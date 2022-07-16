import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';

type PieChartQueryType = {
  pieChartQuery: string;
};

export type DictPieChartQuery = {
  [key in AppNames]: PieChartQueryType;
};
