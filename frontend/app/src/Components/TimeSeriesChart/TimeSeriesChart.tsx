import { useQuery } from 'react-query';
import './TimeSeriesChart.css';

import Chart from './InnerComponents/Chart';
import NoData from '../NoData/NoData';

interface TimeSeriesProps {
  startDateTime: string;
  endDateTime: string;
  dataLoader: (
    startDataTime: string,
    endDataTime: string
  ) => Promise<{
    data: any;
  }>;
}
export default function TimeSeriesChart(props: TimeSeriesProps) {
  const { data, isSuccess } = useQuery(
    [props.startDateTime, props.endDateTime],
    () =>
      props
        .dataLoader(props.startDateTime, props.endDateTime)
        .then((x) => x.data)
  );

  return isSuccess && data.data.length ? (
    <Chart data={data.data} />
  ) : (
    <NoData className="noChartData" />
  );
}
