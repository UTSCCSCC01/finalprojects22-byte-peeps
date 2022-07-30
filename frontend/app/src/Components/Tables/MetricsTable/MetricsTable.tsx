import {
  DataGrid,
  GridColumns,
  GridFilterModel,
  GridToolbar,
} from '@mui/x-data-grid';

export interface MetricsTableProps {
  rowsPerPageOptions?: number[];
  rows: any[];
  rowCount: number;
  loading: boolean;
  colDef: GridColumns<any>;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  filterModel?: GridFilterModel;
  setFilterModel?: (model: GridFilterModel) => void;
}

export default function MetricsTable(props: MetricsTableProps) {
  return (
    <DataGrid
      rowHeight={48}
      rows={props.rows ?? []}
      rowCount={props.rowCount}
      loading={props.loading}
      rowsPerPageOptions={props.rowsPerPageOptions ?? [5, 10]}
      pagination
      page={props.page}
      pageSize={props.pageSize}
      onPageSizeChange={props.setPageSize}
      paginationMode="server"
      onPageChange={(newPage) => props.setPage(newPage)}
      columns={props.colDef}
      filterMode="server"
      filterModel={props.filterModel}
      onFilterModelChange={props.setFilterModel}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  );
}
