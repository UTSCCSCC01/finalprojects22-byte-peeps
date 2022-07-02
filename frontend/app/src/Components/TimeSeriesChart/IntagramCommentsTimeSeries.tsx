import TimeSeriesChart from './TimeSeriesChart';
import HTTP from '../../utils/http';
const startDateTime = '20190820';
const endDateTime = '20190830';
const getAnalysis = async (
  startDateTime: string,
  endDateTime: string
): Promise<{
  data: {
    date: string;
    time: string;
    positive: number;
    negative: number;
    neutral: number;
  }[];
}> => {
  return HTTP.get('/instagram/media/sentiment_analysis', {
    params: { start: startDateTime, end: endDateTime },
  });
};
export default function InstagramCommentsTimeSeries() {
  return (
    <TimeSeriesChart
      startDateTime={startDateTime}
      endDateTime={endDateTime}
      dataLoader={getAnalysis}
    />
  );
}
