import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';

export type DefaultColumnStyleType = {
  sortable: boolean;
  filterable: boolean;
  headerAlign: GridAlignment;
  align: GridAlignment;
};

export type CommentsTableColDef = GridColDef[];

type CommentsTableQueryType = { 
  url: string;
  colDef: CommentsTableColDef;
};

export type CommentTables = {
  [key in AppNames]: CommentsTableQueryType;
};