import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';

export type DefaultColumnStyleType = {
  sortable: boolean;
  filterable: boolean;
  headerAlign: GridAlignment;
  align: GridAlignment;
};

export type MetricsTableColDef = GridColDef[];

type MetricsTableQueryType = {
  url: string;
  colDef: MetricsTableColDef;
};

export type MetricsTables = {
  [key in AppNames]: MetricsTableQueryType;
};
