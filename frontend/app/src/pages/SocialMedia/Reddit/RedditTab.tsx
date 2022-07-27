import { Grid } from '@mui/material';
import React from 'react';
import CardCharts from '../../../Components/Cards/CardCharts';
import CardsHeader from '../../../Components/CardsHeader/CardsHeader';
import SentimentPieChartWrapper from '../../../Components/Charts/PieChart/SentimentPieChartWrapper';
import SubjectivityPieChartWrapper from '../../../Components/Charts/PieChart/SubjectivityPieChartWrapper';
import CommentsWordCloud from '../../../Components/Charts/WordCloud/CommentsWordCloud';
import CommentsTable from '../../../Components/Tables/CommentsTable/CommentsTable';
import PostAnalysis from '../../../Components/PostAnalysis/PostAnalysis';
import GeneralTimeSeriesChart from '../../../Components/TimeSeriesChart/GeneralTimeSeriesChart';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import PostsTable from '../../../Components/Tables/PostsTable/PostsTable';

interface Props {}

const RedditTab: React.FC<Props> = () => {
  return (
    <Grid
      container
      sx={{ padding: 0 }}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={12}>
        <CardsHeader appName={AppNames.Reddit} />
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Word Cloud'}>
          <CommentsWordCloud appName={AppNames.Reddit} />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Sentiment Analysis'}>
          <SentimentPieChartWrapper appName={AppNames.Reddit} />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Subjectivity Analysis'}>
          <SubjectivityPieChartWrapper appName={AppNames.Reddit} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments'}>
          <CommentsTable appName={AppNames.Reddit} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Listings'}>
          <PostsTable appName={AppNames.Reddit} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments Sentiment Analysis By Post'}>
          {/* <TimeSeriesChart /> */}
          <GeneralTimeSeriesChart appName={AppNames.Reddit} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <PostAnalysis appName={AppNames.Reddit} />
      </Grid>
    </Grid>
  );
};

export default RedditTab;
