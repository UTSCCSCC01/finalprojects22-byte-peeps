import { Grid } from '@mui/material';
import React from 'react';
import CardsHeader from '../../../Components/CardsHeader/CardsHeader';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';

interface Props {}

const YelpTab: React.FC<Props> = () => {
  return (
    <Grid
      container
      sx={{ padding: 0 }}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={12}>
        <CardsHeader appName={AppNames.Yelp} />
      </Grid>
    </Grid>
  );
};

export default YelpTab;
