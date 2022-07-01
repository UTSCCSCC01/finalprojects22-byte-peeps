import { useEffect } from 'react';
import { Alert, Backdrop, CircularProgress, Grid, Button, FormControl, InputLabel, TextField, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getSettingsAsync,
  selectSubreddit,
  selectNotificationMessage,
  selectNotificationShown,
  selectNotificationType,
  setNotificationShown,
  selectStatus,
  connectSubredditAsync,
  selectNewSubreddit,
  setStatus,
  setNewSubreddit
} from '../../Redux/Slices/redditSetup/redditSetupSlice';
import { Notification } from '../Notification/Notification';

export function RedditSetup() {
  const status = useAppSelector(selectStatus);
  const subreddit = useAppSelector(selectSubreddit);
  const newSubreddit = useAppSelector(selectNewSubreddit);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getSettingsAsync());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      { status === 'active' && subreddit &&
        <Grid item xs={12}>
          <Alert variant="standard" severity="success">
            Your Reddit account <i>@{subreddit}</i> is connected.
          </Alert>
        </Grid>
      }

      { status === 'active' &&
        <Grid item xs={12}>
          <Button variant="contained" color="info" size='large' onClick={() => dispatch(setStatus('change'))}>
            <EditIcon/>Change
          </Button>
        </Grid>
      }

      { (status === 'reddit-not-set-up' || status === 'change') &&
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField 
              label="Subreddit Name"
              variant="outlined"
              onChange={e => dispatch(setNewSubreddit(e.target.value))}
            />
          </FormControl>
        </Grid>
      }

      { status === 'reddit-not-set-up' &&
        <Grid item xs={12}>
          <Button variant="contained" color="success" size='large' onClick={() => dispatch(connectSubredditAsync(newSubreddit ?? ''))}>
            <SaveIcon/>Save
          </Button>
        </Grid>
      }

      { status === 'change' &&
        <Grid item xs={12}>
          <Button variant="contained" color="success" size='large' onClick={() => dispatch(connectSubredditAsync(newSubreddit ?? ''))}>
            <SaveIcon/>Save
          </Button>
          <Box marginLeft={2} display='inline'>
            <Button variant="contained" color="error" size='large' onClick={() => dispatch(setStatus('active'))}>
              <DoDisturbIcon/>Cancel
            </Button>
          </Box>
        </Grid>
      }

      <Notification
        message={useAppSelector(selectNotificationMessage)}
        type={useAppSelector(selectNotificationType)}
        show={useAppSelector(selectNotificationShown)}
        dispatchHide={() => dispatch(setNotificationShown(false))}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: 1000 }}
        open={status === 'loading'}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
