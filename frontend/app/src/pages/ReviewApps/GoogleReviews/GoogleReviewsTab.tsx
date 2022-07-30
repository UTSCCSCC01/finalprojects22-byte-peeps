import { Grid } from '@mui/material';
import React from 'react';
import CardCharts from '../../../Components/Cards/CardCharts';
import CardsHeader from '../../../Components/CardsHeader/CardsHeader';
import SubjectivityPieChartWrapper from '../../../Components/Charts/PieChart/SubjectivityPieChartWrapper';
import CommentsWordCloud from '../../../Components/Charts/WordCloud/CommentsWordCloud';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import SentimentPieChartWrapper from '../../../Components/Charts/PieChart/SentimentPieChartWrapper';
import ReviewsTable from '../../../Components/Tables/ReviewsTable/ReviewsTable';

interface Props {}

const GoogleReviewsTab: React.FC<Props> = () => {
  return (
    <Grid
      container
      sx={{ padding: 0 }}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={12}>
        <CardsHeader appName={AppNames.GoogleReviews} />
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Word Cloud'}>
          <CommentsWordCloud appName={AppNames.GoogleReviews} />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Sentiment Analysis'}>
          <SentimentPieChartWrapper appName={AppNames.GoogleReviews} />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Subjectivity Analysis'}>
          <SubjectivityPieChartWrapper appName={AppNames.GoogleReviews} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Reviews'}>
          <ReviewsTable appName={AppNames.GoogleReviews} />
        </CardCharts>
      </Grid>
    </Grid>
  );
};

export default GoogleReviewsTab;
