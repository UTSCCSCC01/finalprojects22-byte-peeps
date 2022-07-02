import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper } from '@mui/material';
import PieChart from '../Components/Charts/PieChart/SentimentPieChart';

import TimesSeriesChartExample from '../Components/TimeSeriesChart/TimeSeriesChartExample';
import { Typography } from '@mui/material';
import CardCharts from '../Components/Cards/CardCharts';
import CardInfo from '../Components/Cards/CardInfo';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import DateSelector from '../Components/DateSelector/DateSelector';

export interface IDashProps {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard: React.FunctionComponent<IDashProps> = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Dashboard</h1>
        <button onClick={() => navigate('/')}>log out</button>
      </div>
      {/* <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button onClick={() => navigate('/surveys')}>Surveys</button>
      <button onClick={() => navigate('/reviews')}>Review Apps</button>
      <button onClick={() => navigate('/socials')}>Social Media</button> */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <DateSelector />
          <Grid item xs={2} sm={2} md={3}>
            <CardInfo>
              <OndemandVideoTwoToneIcon style={{ verticalAlign: 'middle' }} />
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  verticalAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                }}
              >
                Videos: 11341783
              </Typography>
            </CardInfo>
          </Grid>
          <Grid item xs={2} sm={2} md={3}>
            <CardInfo>
              <RemoveRedEyeTwoToneIcon style={{ verticalAlign: 'middle' }} />
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                }}
              >
                Views: 11341783
              </Typography>
            </CardInfo>
          </Grid>
          <Grid item xs={2} sm={2} md={3}>
            <CardInfo>
              <ThumbUpTwoToneIcon style={{ verticalAlign: 'middle' }} />
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  verticalAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                }}
              >
                Likes: 11348
              </Typography>
            </CardInfo>
          </Grid>
          <Grid item xs={2} sm={2} md={3}>
            <CardInfo>
              <ChatTwoToneIcon style={{ verticalAlign: 'middle' }} />
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  verticalAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                }}
              >
                Comments: 333
              </Typography>
            </CardInfo>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <CardCharts>
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  paddingBottom: '0.5rem',
                }}
              >
                Sentiment Analysis
              </Typography>
              <PieChart />
            </CardCharts>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>charts/stats, to be added</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>charts/stats, to be added</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>charts/stats, to be added</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>charts/stats, to be added</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>charts/stats, to be added</Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  paddingBottom: '0.5rem',
                }}
              >
                Sentiment Analysis
              </Typography>
              <TimesSeriesChartExample />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
