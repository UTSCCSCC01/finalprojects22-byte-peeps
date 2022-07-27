import {
  GridAlignment,
  GridColDef,
  GridFilterItem,
  GridFilterOperator,
} from '@mui/x-data-grid';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';

export type DefaultColumnStyleType = {
  sortable: boolean;
  filterable: boolean;
  headerAlign: GridAlignment;
  align: GridAlignment;
};

export type DefaultColumnFilterStyleType = {
  filterOperators: GridFilterOperator<any, string | number | null, any>[];
};

export type CommentsTableColDef = GridColDef[];

type CommentsTableQueryType = {
  url: string;
  colDef: CommentsTableColDef;
};

export type CommentTables = {
  [key in AppNames]: CommentsTableQueryType;
};

export type CommentsFilter = GridFilterItem | undefined;
