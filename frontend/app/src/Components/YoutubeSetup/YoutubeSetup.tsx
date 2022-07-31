import { useEffect } from 'react';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Button,
  FormControl,
  TextField,
  Box,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import SyncIcon from '@mui/icons-material/Sync';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getSettingsAsync,
  selectChannel,
  selectStatus,
  connectChannelAsync,
  selectNewChannel,
  setStatus,
  setNewChannel,
  selectFetchState,
} from '../../Redux/Slices/youtubeSetup/youtubeSetupSlice';
import { Notification } from '../Notification/Notification';
import useNotification, {
  NotificationState,
} from '../../utils/hooks/Notification';

let notification: NotificationState;
export function getYouTubeSetupNotification(): NotificationState {
  return notification;
}

export function YoutubeSetup() {
  notification = useNotification({});
  const status = useAppSelector(selectStatus);
  const channel = useAppSelector(selectChannel);
  const newChannel = useAppSelector(selectNewChannel);
  const fetchState = useAppSelector(selectFetchState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSettingsAsync());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {status === 'active' && channel && (
        <Grid item xs={12}>
          <Alert variant="standard" severity="success">
            Your youtube channel <i>{channel}</i> is connected.
          </Alert>
        </Grid>
      )}

      {status === 'active' && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="info"
            size="large"
            onClick={() => dispatch(setStatus('change'))}
          >
            <EditIcon />
            Change
          </Button>
        </Grid>
      )}

      {(status === 'youtube-not-set-up' || status === 'change') && (
        <Grid item xs={12}>
          <Alert severity="info">
            <span>Don't know your Channel ID? </span>
            <a
              href="https://www.youtube.com/account_advanced"
              target="_blank"
              rel="noreferrer"
            >
              Show Me
            </a>
          </Alert>
        </Grid>
      )}

      {(status === 'youtube-not-set-up' || status === 'change') && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Channel ID"
              variant="outlined"
              onChange={(e) => dispatch(setNewChannel(e.target.value))}
            />
          </FormControl>
        </Grid>
      )}

      {status === 'youtube-not-set-up' && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => dispatch(connectChannelAsync(newChannel ?? ''))}
          >
            <SaveIcon />
            Save
          </Button>
        </Grid>
      )}

      {status === 'change' && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => dispatch(connectChannelAsync(newChannel ?? ''))}
          >
            <SaveIcon />
            Save
          </Button>
          <Box marginLeft={2} display="inline">
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={() => dispatch(setStatus('active'))}
            >
              <DoDisturbIcon />
              Cancel
            </Button>
          </Box>
        </Grid>
      )}

      {fetchState === 'fetching' && (
        <Grid item xs={12}>
          <Alert variant="standard" severity="info" icon={<SyncIcon />}>
            Pulling YouTube data, please wait...
          </Alert>
        </Grid>
      )}

      {fetchState === 'fetched' && (
        <Grid item xs={12}>
          <Alert
            variant="standard"
            severity="success"
            icon={<PublishedWithChangesIcon />}
          >
            YouTube data has been pulled
          </Alert>
        </Grid>
      )}

      <Notification state={notification} />

      <Backdrop
        sx={{ color: '#fff', zIndex: 1000 }}
        open={status === 'loading'}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
