import { useQuery } from 'react-query';
import './TimeSeriesChart.css';
import { useTimeSeriesTable } from './TimeSeriesHook';
import Chart from './InnerComponents/Chart';
import NoData from '../NoData/NoData';

export default function GeneralTimeSeriesChart() {
  const query = useTimeSeriesTable();

  return query.isSuccess && query.data.data.length ? (
    <Chart data={query.data.data} />
  ) : (
    <NoData className="noChartData" />
  );
}
