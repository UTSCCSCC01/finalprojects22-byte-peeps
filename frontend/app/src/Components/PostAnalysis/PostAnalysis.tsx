import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import CardCharts from '../Cards/CardCharts';
import CardsHeader from '../CardsHeader/CardsHeader';
import SentimentPieChartWrapper from '../Charts/PieChart/SentimentPieChartWrapper';
import SubjectivityPieChartWrapper from '../Charts/PieChart/SubjectivityPieChartWrapper';
import CommentsTable from '../Tables/CommentsTable/CommentsTable';
import Loader from '../Loader/Loader';
import './PostAnalysis.css';
import usePlatformPosts, { Post } from './PostAnalysisHook';
import NoData from '../NoData/NoData';

interface Props {
  appName: AppNames;
}

const PostAnalysis: React.FC<Props> = (props) => {
  const query = usePlatformPosts(props.appName);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    setPost(query.data && query.data.length > 0 ? query.data[0] : null);
  }, [query.data]);

  return (
    <CardCharts
      name={'Post Analysis'}
      action={
        post && (
          <Autocomplete
            disableClearable
            blurOnSelect
            options={query.data ?? []}
            value={query.data?.find((item) => item.id === post.id)}
            onChange={(e, val) => {
              if (val) setPost(val);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        )
      }
    >
      {query.isLoading && <Loader />}
      {!post && !query.isLoading && <NoData />}
      {post && !query.isLoading && (
        <Grid
          container
          sx={{ padding: 0 }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Card variant="outlined">
              <CardHeader
                title={<div className="cardTitle">General Information</div>}
              />
              <CardContent className="cardChartContent">
                <div style={{ minHeight: '325px' }}>
                  <h3 className="post-info">Title:</h3>
                  <p className="post-info">{post.label}</p>
                  <h3 className="post-info">Date published:</h3>
                  <p className="post-info">{post.date}</p>
                  <h3 className="post-info">Unique identifier:</h3>
                  <p className="post-info">{post.pid}</p>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <CardCharts name={'Sentiment Analysis'} variant="outlined">
              <SentimentPieChartWrapper
                appName={AppNames.Instagram}
                postId={typeof post.id === 'number' ? post.id : undefined}
              />
            </CardCharts>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <CardCharts name={'Subjectivity Analysis'} variant="outlined">
              <SubjectivityPieChartWrapper
                appName={AppNames.Instagram}
                postId={typeof post.id === 'number' ? post.id : undefined}
              />
            </CardCharts>
          </Grid>

          <Grid item xs={12}>
            <CardsHeader
              appName={props.appName}
              variant="outlined"
              postId={typeof post.id === 'number' ? post.id : undefined}
            />
          </Grid>

          <Grid item xs={12}>
            <CardCharts name={'Comments'} variant="outlined">
              <CommentsTable
                appName={AppNames.Instagram}
                postId={typeof post.id === 'number' ? post.id : undefined}
              />
            </CardCharts>
          </Grid>
        </Grid>
      )}
    </CardCharts>
  );
};

export default PostAnalysis;
