import useCommentsTable from './CommentsTableHook';
import MetricsTable from '../MetricsTable/MetricsTable';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';

export default function CommentsTable(props: {
  appName: AppNames;
  postId?: number;
}) {
  const query = useCommentsTable(props.appName, props.postId);

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
