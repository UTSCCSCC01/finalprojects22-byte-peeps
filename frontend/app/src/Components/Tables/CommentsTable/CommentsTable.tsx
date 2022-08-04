import useCommentsTable from './CommentsTableHook';
import MetricsTable from '../MetricsTable/MetricsTable';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import { GridFilterModel } from '@mui/x-data-grid';

export default function CommentsTable(props: {
  appName: AppNames;
  postId?: number;
}) {
  const query = useCommentsTable(props.appName, props.postId);

  const filterModel: GridFilterModel = {
    items: query.filterModel === undefined ? [] : [query.filterModel],
  };

  return (
    <div style={{ height: 386.5, width: '100%' }}>
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
