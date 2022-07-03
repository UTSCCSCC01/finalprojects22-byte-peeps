import React, { useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, Typography } from '@mui/material';
import TimesSeriesChartExample from '../Components/TimeSeriesChart/TimeSeriesChartExample';
import InstagramCommentsTimeSeries from '../Components/TimeSeriesChart/IntagramCommentsTimeSeries';
import InstagramCommentsTable from '../Components/MetricsTable/InstagramCommentsTable';
import PieChart, {
  PieChartAnalysisProps,
} from '../Components/Charts/PieChart/PieChartAnalysis';
import CardCharts from '../Components/Cards/CardCharts';
import CardInfo from '../Components/Cards/CardInfo';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import DateSelector from '../Components/DateSelector/DateSelector';
import {
  getCommentsSentimentAnalysis,
  getFacebookStats,
  selectSentimentAnalysis,
  selectError,
  selectIsSentimentAnalysisLoading,
  selectIsStatsLoading,
  selectFacebookStats,
  selectStatsError,
} from '../Redux/Slices/facebook/facebookSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { SentimentAnalysisColors } from '../utils/enums';

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
  const dispatch = useAppDispatch();

  // Facebook Stats
  const facebookStats = useAppSelector(selectFacebookStats);
  const isStatsLoading = useAppSelector(selectIsStatsLoading);
  const statsError = useAppSelector(selectStatsError);
  const facebookStatsObj = {
    isLoading: isStatsLoading,
    error: statsError,
  };

  // Sentiment Analysis (PieChart)
  const dataRetured = useAppSelector(selectSentimentAnalysis);
  const error = useAppSelector(selectError);
  const isSentimentAnalysisLoading = useAppSelector(
    selectIsSentimentAnalysisLoading
  );
  const data = [
    { name: 'Positve', value: 0 },
    { name: 'Negative', value: 0 },
    { name: 'Neutral', value: 0 },
  ];
  let isDataPresent: Boolean | null = null;
  if (dataRetured) {
    data[0].value = dataRetured.positive;
    data[1].value = dataRetured.negative;
    data[2].value = dataRetured.neutral;
    isDataPresent =
      data[0].value > 0 || data[1].value > 0 || data[2].value > 0
        ? true
        : data[0].value === 0 || data[1].value === 0 || data[2].value === 0
        ? false
        : null;
  }
  const COLORS = [
    SentimentAnalysisColors.Positive,
    SentimentAnalysisColors.Neutral,
    SentimentAnalysisColors.Negative,
  ];

  const facebookSentimentAnalysis: PieChartAnalysisProps = {
    data,
    isLoading: isSentimentAnalysisLoading,
    error,
    isDataPresent,
    COLORS,
  };

  useEffect(() => {
    // Sentiment Analysis (PieChart)
    dispatch(getCommentsSentimentAnalysis());

    // Facebook stats
    dispatch(getFacebookStats());
  }, [dispatch]);

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
        <DateSelector />
        <button onClick={() => navigate('/')}>log out</button>
      </div>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={2} md={3}>
            <CardInfo error={null} isLoading={false}>
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
            <CardInfo error={null} isLoading={false}>
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
            <CardInfo {...facebookStatsObj}>
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
                Likes: {facebookStats?.totalLikes}
              </Typography>
            </CardInfo>
          </Grid>
          <Grid item xs={2} sm={2} md={3}>
            <CardInfo {...facebookStatsObj}>
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
                Comments: {facebookStats?.totalComments}
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
              <PieChart {...facebookSentimentAnalysis} />
            </CardCharts>
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
                Comments
              </Typography>
              <InstagramCommentsTable />
            </Item>
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
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
