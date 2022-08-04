import {
  getGridNumericOperators,
  getGridStringOperators,
} from '@mui/x-data-grid';
import {
  DefaultColumnFilterStyleType,
  DefaultColumnStyleType,
} from './MetricsTableQueryTypes';

export const defaultColumnStyle: DefaultColumnStyleType = {
  sortable: false,
  filterable: true,
  headerAlign: 'left',
  align: 'left',
  showHover: false,
};

// Filter operators for strings
export const filterStringOperators = getGridStringOperators().filter(
  ({ value }) => ['contains'].includes(value)
);
export const defaultStringFilterStyle: DefaultColumnFilterStyleType = {
  filterOperators: filterStringOperators,
};

// Filter operators for numbers
export const filterNumberOperators = getGridNumericOperators().filter(
  ({ value }) => ['='].includes(value)
);
export const defaultNumberFilterStyle: DefaultColumnFilterStyleType = {
  filterOperators: filterNumberOperators,
};
