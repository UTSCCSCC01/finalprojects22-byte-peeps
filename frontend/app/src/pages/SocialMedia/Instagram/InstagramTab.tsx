import { Grid } from '@mui/material';
import React from 'react';
import CardCharts from '../../../Components/Cards/CardCharts';
import CardsHeader from '../../../Components/CardsHeader/CardsHeader';

import CommentsTable from '../../../Components/CommentsTable/CommentsTable';
import SentimentTimeSeries from '../../../Components/TimeSeriesChart/Sentiment/SentimentTimeSeries';
import SubjectivityTimeSeries from '../../../Components/TimeSeriesChart/Subjectivity/SubjectivityTimeSeries';

import SentimentPieChartWrapper from '../../../Components/Charts/PieChart/SentimentPieChartWrapper';
import SubjectivityPieChartWrapper from '../../../Components/Charts/PieChart/SubjectivityPieChartWrapper';
import CommentsWordCloud from '../../../Components/Charts/WordCloud/CommentsWordCloud';
import PostAnalysis from '../../../Components/PostAnalysis/PostAnalysis';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';

interface Props {}

const InstagramTab: React.FC<Props> = () => {
  return (
    <Grid
      container
      sx={{ padding: 0 }}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={12}>
        <CardsHeader appName={AppNames.Instagram} />
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Word Cloud'}>
          <CommentsWordCloud appName={AppNames.Instagram} />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Sentiment Analysis'}>
          <SentimentPieChartWrapper appName={AppNames.Instagram} />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Subjectivity Analysis'}>
          <SubjectivityPieChartWrapper appName={AppNames.Instagram} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments & Tags'}>
          <CommentsTable appName={AppNames.Instagram} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments Sentiment Analysis By Post'}>
          <SentimentTimeSeries appName={AppNames.Instagram} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments Subjectivity Analysis By Post'}>
          <SubjectivityTimeSeries appName={AppNames.Facebook} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <PostAnalysis appName={AppNames.Instagram} />
      </Grid>
    </Grid>
  );
};

export default InstagramTab;
