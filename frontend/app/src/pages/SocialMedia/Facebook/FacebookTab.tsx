import { Grid } from '@mui/material';
import React from 'react';
import CardCharts from '../../../Components/Cards/CardCharts';
import CardsHeader from '../../../Components/CardsHeader/CardsHeader';
import GeneralTimeSeriesChart from '../../../Components/TimeSeriesChart/GeneralTimeSeriesChart';
import SentimentPieChartWrapper from '../../../Components/Charts/PieChart/SentimentPieChartWrapper';
import SubjectivityPieChartWrapper from '../../../Components/Charts/PieChart/SubjectivityPieChartWrapper';
import CommentsWordCloud from '../../../Components/Charts/WordCloud/CommentsWordCloud';
import PostAnalysis from '../../../Components/PostAnalysis/PostAnalysis';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import CommentsTable from '../../../Components/Tables/CommentsTable/CommentsTable';

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
  return (
    <Grid
      container
      sx={{ padding: 0 }}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={12}>
        <CardsHeader appName={AppNames.Facebook} />
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Word Cloud'}>
          <CommentsWordCloud appName={AppNames.Facebook} />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Sentiment Analysis'}>
          <SentimentPieChartWrapper appName={AppNames.Facebook} />
        </CardCharts>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <CardCharts name={'Subjectivity Analysis'}>
          <SubjectivityPieChartWrapper appName={AppNames.Facebook} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments'}>
          <CommentsTable appName={AppNames.Facebook} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <CardCharts name={'Comments Sentiment Analysis By Post'}>
          <GeneralTimeSeriesChart appName={AppNames.Facebook} />
        </CardCharts>
      </Grid>

      <Grid item xs={12}>
        <PostAnalysis appName={AppNames.Facebook} />
      </Grid>
    </Grid>
  );
};

export default FacebookTab;
