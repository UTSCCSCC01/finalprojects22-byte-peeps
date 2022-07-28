import { Grid } from '@mui/material';
import React from 'react';
import CardCharts from '../../../Components/Cards/CardCharts';
import CardsHeader from '../../../Components/CardsHeader/CardsHeader';
import CommentsWordCloud from '../../../Components/Charts/WordCloud/CommentsWordCloud';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';

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
    </Grid>
  );
};

export default GoogleReviewsTab;
