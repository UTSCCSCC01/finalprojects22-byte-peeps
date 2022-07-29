import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import NoData from '../NoData/NoData';
import Chart from './InnerComponents/Chart';
import './TimeSeriesChart.css';
import { useTimeSeriesTable } from './TimeSeriesHook';

export default function GeneralTimeSeriesChart(props: { appName: AppNames }) {
  const query = useTimeSeriesTable(props.appName);

  return query.isSuccess && query.data.data.length ? (
    <Chart data={query.data.data} />
  ) : (
    <NoData className="noChartData" />
  );
}
