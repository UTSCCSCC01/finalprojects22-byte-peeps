import {
  GridAlignment,
  GridColDef,
  GridFilterItem,
  GridFilterOperator,
} from '@mui/x-data-grid';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';

export type DefaultColumnStyleType = {
  sortable: boolean;
  filterable: boolean;
  headerAlign: GridAlignment;
  align: GridAlignment;
  showHover: boolean;
};

export type DefaultColumnFilterStyleType = {
  filterOperators: GridFilterOperator<any, string | number | null, any>[];
};

interface MetricsTableCol extends GridColDef {
  showHover: boolean;
}

export type MetricsTableColDef = MetricsTableCol[];

type MetricsTableQueryType = {
  url: string;
  colDef: MetricsTableColDef;
};

export type MetricsTables = {
  [key in AppNames]: MetricsTableQueryType;
};

export type MetricsFilter = GridFilterItem | undefined;
