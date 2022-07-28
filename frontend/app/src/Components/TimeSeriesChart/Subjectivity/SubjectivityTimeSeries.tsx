import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import NoData from '../../NoData/NoData';
import SubjectivityChart from './../InnerComponents/SubjectivityChart';
import './TimeSeriesChart.css';
import { useTimeSeriesTable } from './SubjectivitytHook';

export default function GeneralTimeSeriesChart(props: { appName: AppNames }) {
  const query = useTimeSeriesTable(props.appName);

  return query.isSuccess && query.data.data.length ? (
    <SubjectivityChart data={query.data.data} />
  ) : (
    <NoData className="noChartData" />
  );
}
