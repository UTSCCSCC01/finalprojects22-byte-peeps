import TimeSeriesChart from './TimeSeriesChart';
import HTTP from '../../utils/http';
import { useAppSelector } from '../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../Redux/Slices/dateSelector/dateSelectorSlice';

export default function InstagramCommentsTimeSeries() {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  // const startDateTime = '20190820';
  // const endDateTime = '20190830';

  const getAnalysis = async (
    startDateTime: string,
    endDateTime: string
  ): Promise<{
    data: {
      data: {
        date: string;
        time: string;
        positive: number;
        negative: number;
        neutral: number;
      }[];
    };
  }> => {
    return HTTP.get('/instagram/media/sentiment_analysis', {
      params: {
        start: startDate.split('T')[0].replaceAll('-', ''),
        end: endDate.split('T')[0].replaceAll('-', ''),
      },
    });
  };

  return (
    <TimeSeriesChart
      startDateTime={startDate.split('T')[0].replaceAll('-', '')}
      endDateTime={endDate.split('T')[0].replaceAll('-', '')}
      dataLoader={getAnalysis}
    />
  );
}
