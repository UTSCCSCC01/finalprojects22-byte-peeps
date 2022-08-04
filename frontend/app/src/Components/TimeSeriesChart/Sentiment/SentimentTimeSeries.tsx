import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import NoData from '../../NoData/NoData';
import SentimentChart from '../InnerComponents/SentimentChart';
import '../TimeSeriesChart.css';
import { useTimeSeriesSentiment } from './SentimentHook';

export default function GeneralTimeSeriesChart(props: { appName: AppNames }) {
  const query = useTimeSeriesSentiment(props.appName);

  return query.isSuccess && query.data.data.length ? (
    <SentimentChart data={query.data.data} />
  ) : (
    <NoData className="noChartData" />
  );
}
