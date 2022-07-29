import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import NoData from '../../NoData/NoData';
import SubjectivityChart from './../InnerComponents/SubjectivityChart';
import '../TimeSeriesChart.css';
import { useTimeSeriesSubjectivity } from './SubjectivitytHook';
import HTTP from '../../../utils/http';

export default function GeneralTimeSeriesChart(props: { appName: AppNames }) {
  const query = useTimeSeriesSubjectivity(props.appName);
  return query.isSuccess && query.data.data.length ? (
    <SubjectivityChart data={query.data.data} />
  ) : (
    <NoData className="noChartData" />
  );
}
