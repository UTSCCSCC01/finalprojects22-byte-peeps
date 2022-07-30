import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import NoData from '../../NoData/NoData';
import '../TimeSeriesChart.css';
import SubjectivityChart from './../InnerComponents/SubjectivityChart';
import { useTimeSeriesSubjectivity } from './SubjectivitytHook';

export default function GeneralTimeSeriesChart(props: { appName: AppNames }) {
  const query = useTimeSeriesSubjectivity(props.appName);
  return query.isSuccess && query.data.data.length ? (
    <SubjectivityChart data={query.data.data} />
  ) : (
    <NoData className="noChartData" />
  );
}
