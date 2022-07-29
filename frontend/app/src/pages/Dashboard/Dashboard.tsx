import React from 'react';
import SentimentPieChartDashboard from '../../Components/Charts/PieChart/SentimentPieChartDashboard';
import SubjectivityPieChartDashboard from '../../Components/Charts/PieChart/SubjectivityPieChartDashboard';
import { Grid } from '@mui/material';
import CardCharts from '../../Components/Cards/CardCharts';
import CardsHeader from '../../Components/CardsHeader/CardsHeader';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import CircularProgressChart from '../../Components/Charts/DonutChart/CircularProgressChart';
import SentimentPerformanceChart from '../../Components/Charts/DonutChart/SentimentPerformanceChart';

interface Props {}

const Dashboard: React.FunctionComponent<Props> = () => {
  return (
    <div className="page">
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
            {/* <CommentsWordCloud appName={AppNames.Facebook} /> */}
          </CardCharts>
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
          <CardCharts name={'Sentiment Analysis'}>
            <SentimentPieChartDashboard />
          </CardCharts>
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
          <CardCharts name={'Subjectivity Analysis'}>
            <SubjectivityPieChartDashboard />
          </CardCharts>
        </Grid>

        <Grid item xs={12}>
          <CardCharts name={'Sentiment Performance by Platform'}>
            <SentimentPerformanceChart />
            {/* <CommentsTable appName={AppNames.Facebook} /> */}
          </CardCharts>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
