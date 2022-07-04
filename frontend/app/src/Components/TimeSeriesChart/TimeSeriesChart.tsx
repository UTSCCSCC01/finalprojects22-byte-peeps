import { useQuery } from 'react-query';
import './styles.css';

import Chart from './InnerComponents/Chart';

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

  return isSuccess ? <Chart data={data.data} /> : <div>Failed to load</div>;
}
