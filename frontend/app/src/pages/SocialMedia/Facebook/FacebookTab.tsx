import { Grid } from '@mui/material';
import React, { useEffect } from 'react';

import CardCharts from '../../../Components/Cards/CardCharts';
import CardsHeader from '../../../Components/CardsHeader/CardsHeader';
import PieChart, {
  PieChartAnalysisProps,
} from '../../../Components/Charts/PieChart/PieChartAnalysis';
import InstagramCommentsTable from '../../../Components/MetricsTable/InstagramCommentsTable';
import InstagramCommentsTimeSeries from '../../../Components/TimeSeriesChart/IntagramCommentsTimeSeries';
import TimeSeriesChart from '../../../Components/TimeSeriesChart/TimeSeriesChartExample';
import ToBeImplemented from '../../../Components/ToBeImplemented/ToBeImplemented';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import {
  getCommentsSentimentAnalysis,
  selectError,
  selectIsSentimentAnalysisLoading,
  selectSentimentAnalysis,
} from '../../../Redux/Slices/facebook/facebookSlice';
import { SentimentAnalysisColors } from '../../../utils/enums';
import PieChartWrapper from '../../../Components/Charts/PieChart/PieChartWrapper';
import {
  selectStartDate,
  selectEndDate,
} from '../../../Redux/Slices/dateSelector/dateSelectorSlice';
// import {DateRangeState} from '../../'

// todo not sure if this is necessary since mui theme takes care of dark mode
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

interface Props {}

const FacebookTab: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  useEffect(() => {
    // Sentiment Analysis (PieChart)
    dispatch(getCommentsSentimentAnalysis({startDate, endDate}));
  }, [dispatch, startDate, endDate]);

  return (
    <Grid
      container
      sx={{ padding: 0 }}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={12}>
        <CardsHeader />
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Word Cloud'}>
          <ToBeImplemented className="exampleChart center" />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Sentiment Analysis'}>
          {/* <PieChart {...facebookSentimentAnalysis} /> */}
          <PieChartWrapper />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Subjectivity Analysis'}>
          <ToBeImplemented className="exampleChart center" />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments'}>
          <InstagramCommentsTable />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments Sentiment Analysis By Post'}>
          {/* <TimeSeriesChart /> */}
          <InstagramCommentsTimeSeries />
        </CardCharts>
      </Grid>
      <Grid item xs={12}>
        <CardCharts name={'Comments Subjectivity Analysis By Post'}>
          <TimeSeriesChart />
        </CardCharts>
      </Grid>
    </Grid>
  );
};

export default FacebookTab;
