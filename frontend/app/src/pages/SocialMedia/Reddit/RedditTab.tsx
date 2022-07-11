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

interface Props {}

const RedditTab: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  // Sentiment Analysis (PieChart)
  const dataRetured = useAppSelector(selectSentimentAnalysis);
  const error = useAppSelector(selectError);
  const isSentimentAnalysisLoading = useAppSelector(
    selectIsSentimentAnalysisLoading
  );

  const data = [
    { name: 'Positve', value: 0 },
    { name: 'Negative', value: 0 },
    { name: 'Neutral', value: 0 },
  ];

  let isDataPresent: Boolean | null = null;

  if (dataRetured) {
    data[0].value = dataRetured.positive;
    data[1].value = dataRetured.negative;
    data[2].value = dataRetured.neutral;
    isDataPresent =
      data[0].value > 0 || data[1].value > 0 || data[2].value > 0
        ? true
        : data[0].value === 0 || data[1].value === 0 || data[2].value === 0
        ? false
        : null;
  }

  const COLORS = [
    SentimentAnalysisColors.Positive,
    SentimentAnalysisColors.Neutral,
    SentimentAnalysisColors.Negative,
  ];

  const facebookSentimentAnalysis: PieChartAnalysisProps = {
    data,
    isLoading: isSentimentAnalysisLoading,
    error,
    isDataPresent,
    COLORS,
  };

  useEffect(() => {
    // Sentiment Analysis (PieChart)
    dispatch(getCommentsSentimentAnalysis());
  }, [dispatch]);

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
          <PieChart {...facebookSentimentAnalysis} />
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

export default RedditTab;
