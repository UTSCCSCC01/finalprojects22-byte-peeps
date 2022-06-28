import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useQuery } from 'react-query';

interface MetricsTableProps {
  key: string,
  columns: GridColDef[],
  pageSize?: number
  rowsPerPageOptions?: number[],
  dataLoader: (pageNumber: number, pageSize: number) => Promise<{ count: number; data: any }>
}

export default function MetricsTable(props: MetricsTableProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(props.pageSize ?? 5);
  const { data, status } = useQuery([`metricsTable-${props.key}`, page, pageSize], () => props.dataLoader(page, pageSize));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data?.data ?? []}
        rowCount={data?.count ?? 0}
        loading={status === "loading"}
        rowsPerPageOptions={props.rowsPerPageOptions ?? [5, 10]}
        pagination
        page={page}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        columns={props.columns}
      />
    </div>
  );
}