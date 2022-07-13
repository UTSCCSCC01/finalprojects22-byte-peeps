import { Grid } from '@mui/material';
import React from 'react';
import CardCharts from '../../../Components/Cards/CardCharts';
import CardsHeader from '../../../Components/CardsHeader/CardsHeader';
import CommentsTable from '../../../Components/CommentsTable/CommentsTable';
import InstagramCommentsTimeSeries from '../../../Components/TimeSeriesChart/IntagramCommentsTimeSeries';
import TimeSeriesChart from '../../../Components/TimeSeriesChart/TimeSeriesChartExample';
import ToBeImplemented from '../../../Components/ToBeImplemented/ToBeImplemented';
import SentimentPieChartWrapper from '../../../Components/Charts/PieChart/SentimentPieChartWrapper';
import SubjectivityPieChartWrapper from '../../../Components/Charts/PieChart/SubjectivityPieChartWrapper';

interface Props {}

const YoutubeTab: React.FC<Props> = () => {
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
          <SentimentPieChartWrapper />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Subjectivity Analysis'}>
          <SubjectivityPieChartWrapper />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments'}>
          <CommentsTable />
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

export default YoutubeTab;
