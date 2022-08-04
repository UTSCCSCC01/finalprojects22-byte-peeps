import { Popover } from '@mui/material';
import { DataGrid, GridFilterModel, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { MetricsTableColDef } from './MetricsTableQueryTypes';
import './MetricsTable.css';

//Credits for popover: https://mui.com/x/react-data-grid/components/#cell

type rowData = {
  id: number;
  [key: string]: any;
};

export interface MetricsTableProps {
  rowsPerPageOptions?: number[];
  rows: rowData[];
  rowCount: number;
  loading: boolean;
  colDef: MetricsTableColDef;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  filterModel?: GridFilterModel;
  setFilterModel?: (model: GridFilterModel) => void;
}

export default function MetricsTable(props: MetricsTableProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [headerName, setHeaderName] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    const fieldName = event.currentTarget.dataset.field!;
    const colIndex = parseInt(event.currentTarget.dataset.colindex!);
    const dataHeaderName = props.colDef[colIndex].headerName;
    const showHover = props.colDef[colIndex].showHover;
    if (!showHover) return;

    const id = event.currentTarget.parentElement!.dataset.id!;
    const row = props.rows.find((r) => r.id.toString() === id)!;

    setHeaderName(dataHeaderName || '');
    setValue(row[fieldName]);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
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
        componentsProps={{
          cell: {
            onMouseEnter: handlePopoverOpen,
            onMouseLeave: handlePopoverClose,
          },
        }}
      />
      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="popOverEl center">
          <div className="headerName">{headerName}:</div>
          <div className="value center">{value}</div>
        </div>
      </Popover>
    </>
  );
}
