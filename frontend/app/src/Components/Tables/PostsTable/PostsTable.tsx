import usePostsTable from './PostsTableHook';
import MetricsTable from '../MetricsTable/MetricsTable';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';

export default function PostsTable(props: { appName: AppNames }) {
  const query = usePostsTable(props.appName);

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
