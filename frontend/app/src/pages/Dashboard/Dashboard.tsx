import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import CardCharts from '../../Components/Cards/CardCharts';
import CardsHeader from '../../Components/CardsHeader/CardsHeader';
import SentimentPerformanceChart from '../../Components/Charts/DonutChart/SentimentPerformanceChart';
import SentimentPieChartDashboard from '../../Components/Charts/PieChart/SentimentPieChartDashboard';
import SubjectivityPieChartDashboard from '../../Components/Charts/PieChart/SubjectivityPieChartDashboard';
import { RouteNames } from '../../Components/Router/RoutesConstants';
import { useAppDispatch } from '../../Redux/hooks';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { setPageName } from '../../Redux/Slices/webApp/webAppSlice';

interface Props {}

const Dashboard: React.FunctionComponent<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName(RouteNames.Dashboard));
  }, [dispatch]);

  return <div className="page"></div>;
};

export default Dashboard;
