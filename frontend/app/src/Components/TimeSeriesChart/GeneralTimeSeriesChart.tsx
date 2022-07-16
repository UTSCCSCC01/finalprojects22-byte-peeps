import NoData from '../NoData/NoData';
import Chart from './InnerComponents/Chart';
import './TimeSeriesChart.css';
import { useTimeSeriesTable } from './TimeSeriesHook';

export default function GeneralTimeSeriesChart() {
  const query = useTimeSeriesTable();

  return query.isSuccess && query.data.data.length ? (
    <Chart data={query.data.data} />
  ) : (
    <NoData className="noChartData" />
  );
}
