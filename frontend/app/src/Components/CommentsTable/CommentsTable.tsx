import useCommentsTable from './CommentsTableHook';
import MetricsTable from '../MetricsTable/MetricsTable';

export default function CommentsTable(props: { postId?: number }) {
  const query = useCommentsTable(props.postId);

  return (
    <div style={{ height: 350.5, width: '100%' }}>
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
