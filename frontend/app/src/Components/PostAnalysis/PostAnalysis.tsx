import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import CardCharts from '../Cards/CardCharts';
import CommentsTable from '../CommentsTable/CommentsTable';
import Loader from '../Loader/Loader';
import usePlatformPosts from './PostAnalysisHook';
import './PostAnalysis.css';

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
        <div style={{ width: '100%' }}>
          <CommentsTable postId={typeof postId == 'number' ? postId : -1} />
        </div>
      )}
    </CardCharts>
  );
}
