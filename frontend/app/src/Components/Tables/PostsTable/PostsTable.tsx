import usePostsTable from './PostsTableHook';
import MetricsTable from '../MetricsTable/MetricsTable';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import { GridFilterModel } from '@mui/x-data-grid';

export default function PostsTable(props: { appName: AppNames }) {
  const query = usePostsTable(props.appName);

  const filterModel: GridFilterModel = {
    items: query.filterModel === undefined ? [] : [query.filterModel],
  };

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
        filterModel={filterModel}
        setFilterModel={(model: GridFilterModel) =>
          query.setFilterModel(model.items[0])
        }
      />
    </div>
  );
}
