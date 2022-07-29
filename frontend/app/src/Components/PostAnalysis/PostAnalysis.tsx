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
import CommentsTable from '../CommentsTable/CommentsTable';
import Loader from '../Loader/Loader';
import './PostAnalysis.css';
import usePlatformPosts from './PostAnalysisHook';

interface Props {
  appName: AppNames;
}

const PostAnalysis: React.FC<Props> = (props) => {
  const query = usePlatformPosts();
  const [postId, setPostId] = useState<number | ''>('');
  const [postTitle, setPostTitle] = useState<string>('');
  const [postDate, setPostDate] = useState<string>('');
  const [postPid, setPostPid] = useState<string>('');

  useEffect(() => {
    setPostId(query.data?.at(0)?.id ?? '');
    setPostTitle(query.data?.at(0)?.label ?? '');
    setPostDate(query.data?.at(0)?.date ?? '');
    setPostPid(query.data?.at(0)?.pid ?? '');
  }, [query.data]);

  return (
    <CardCharts
      name={'Post Analysis'}
      action={
        postId && (
          <Autocomplete
            disableClearable
            blurOnSelect
            options={query.data ?? []}
            value={query.data?.find((item) => item.id === postId)}
            onChange={(e, val) => {
              if (val) {
                setPostId(val.id);
                setPostTitle(val.label);
                setPostDate(val.date);
                setPostPid(val.pid);
              }
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        )
      }
    >
      {!postId && <Loader />}
      {!query.isLoading && (
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
                  <p className="post-info">{postTitle}</p>
                  <h3 className="post-info">Date published:</h3>
                  <p className="post-info">{postDate}</p>
                  <h3 className="post-info">Unique identifier:</h3>
                  <p className="post-info">{postPid}</p>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <CardCharts name={'Sentiment Analysis'} variant="outlined">
              <SentimentPieChartWrapper
                appName={AppNames.Instagram}
                postId={typeof postId === 'number' ? postId : undefined}
              />
            </CardCharts>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <CardCharts name={'Subjectivity Analysis'} variant="outlined">
              <SubjectivityPieChartWrapper
                appName={AppNames.Instagram}
                postId={typeof postId === 'number' ? postId : undefined}
              />
            </CardCharts>
          </Grid>

          <Grid item xs={12}>
            <CardsHeader
              appName={props.appName}
              variant="outlined"
              postId={typeof postId === 'number' ? postId : undefined}
            />
          </Grid>

          <Grid item xs={12}>
            <CardCharts name={'Comments'} variant="outlined">
              <CommentsTable
                appName={AppNames.Instagram}
                postId={typeof postId === 'number' ? postId : undefined}
              />
            </CardCharts>
          </Grid>
        </Grid>
      )}
    </CardCharts>
  );
};

export default PostAnalysis;
