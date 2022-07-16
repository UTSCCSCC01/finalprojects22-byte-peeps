import useCommentsTable from './CommentsTableHook';
import MetricsTable from '../MetricsTable/MetricsTable';

export default function CommentsTable() {
  const query = useCommentsTable();

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MetricsTable
        colDef={query.colDef}
        loading={query.isLoading}
        rowCount={query.data === undefined ? 0 : query.data?.count ?? 0}
        rows={query.data === undefined ? [] : query.data?.data ?? []}
        page={query.page}
        setPage={query.setPage}
        pageSize={query.pageSize}
        setPageSize={query.setPageSize}
      />
    </div>
  );
}
