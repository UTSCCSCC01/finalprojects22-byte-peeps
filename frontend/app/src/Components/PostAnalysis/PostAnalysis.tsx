import { Autocomplete, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import CardCharts from '../Cards/CardCharts';
import CommentsTable from '../CommentsTable/CommentsTable';
import Loader from '../Loader/Loader';
import usePlatformPosts from './PostAnalysisHook';
import './PostAnalysis.css';
import SubjectivityPieChartWrapper from '../Charts/PieChart/SubjectivityPieChartWrapper';
import SentimentPieChartWrapper from '../Charts/PieChart/SentimentPieChartWrapper';
import ToBeImplemented from '../ToBeImplemented/ToBeImplemented';

export default function PostAnalysis() {
  const query = usePlatformPosts();
  const [postId, setPostId] = useState<number | ''>('');

  useEffect(() => {
    setPostId(query.data?.at(0)?.id ?? '');
  }, [query.data?.at(0)?.id]);

  return (
    <CardCharts
      name={'Post Analysis'}
      action={
        postId && (
          <Autocomplete
            disableClearable
            blurOnSelect
            options={query.data ?? []}
            value={query.data?.find((item) => item.id == postId)}
            onChange={(e, val) => {
              if (val) setPostId(val.id);
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
            <CardCharts name={'Word Cloud'} variant="outlined">
              <ToBeImplemented className="exampleChart center" />
            </CardCharts>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <CardCharts name={'Sentiment Analysis'} variant="outlined">
              <SentimentPieChartWrapper
                postId={typeof postId == 'number' ? postId : undefined}
              />
            </CardCharts>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <CardCharts name={'Subjectivity Analysis'} variant="outlined">
              <SubjectivityPieChartWrapper
                postId={typeof postId == 'number' ? postId : undefined}
              />
            </CardCharts>
          </Grid>

          <Grid item xs={12}>
            <CardCharts name={'Comments'} variant="outlined">
              <CommentsTable
                postId={typeof postId == 'number' ? postId : undefined}
              />
            </CardCharts>
          </Grid>
        </Grid>
      )}
    </CardCharts>
  );
}
