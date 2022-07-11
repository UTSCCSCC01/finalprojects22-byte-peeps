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

type AppCommentTables = {
  [key in AppNames]: CommentsTableQueryType;
};

export interface CommentTables extends AppCommentTables {
  default: CommentsTableQueryType;
}
