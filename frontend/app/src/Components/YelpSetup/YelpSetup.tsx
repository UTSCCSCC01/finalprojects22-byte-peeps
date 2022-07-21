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
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getSettingsAsync,
  selectBusiness,
  selectStatus,
  connectBusinessAsync,
  selectNewBusiness,
  setStatus,
  setNewBusiness,
  searchBusinessAsync,
  selectSearchObject,
  setSearchTerm,
  setSearchLocation,
  selectSearchResults,
} from '../../Redux/Slices/yelpSetup/yelpSetupSlice';
import { Notification } from '../Notification/Notification';
import useNotification, {
  NotificationState,
} from '../../utils/hooks/Notification';

let notification: NotificationState;
export function getYelpSetupNotification(): NotificationState {
  return notification;
}

export function YelpSetup() {
  notification = useNotification({});
  const status = useAppSelector(selectStatus);
  const business = useAppSelector(selectBusiness);
  const newBusiness = useAppSelector(selectNewBusiness);
  const searchObject = useAppSelector(selectSearchObject);
  const searchResults = useAppSelector(selectSearchResults);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSettingsAsync());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {(status === 'yelp-not-set-up' || status === 'change') && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Business Name"
              variant="outlined"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </FormControl>
        </Grid>
      )}

      {(status === 'yelp-not-set-up' || status === 'change') && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="City (Business location)"
              variant="outlined"
              onChange={(e) => dispatch(setSearchLocation(e.target.value))}
            />
          </FormControl>
        </Grid>
      )}

      {status === 'yelp-not-set-up' && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => {
              if (searchObject) dispatch(searchBusinessAsync(searchObject));
            }}
          >
            <SearchIcon />
            Search
          </Button>
        </Grid>
      )}

      {status === 'choose-business' && searchResults && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="business-select-label">Business</InputLabel>
            <Select
              labelId="business-page-select-label"
              label="Business"
              onChange={(e) =>
                dispatch(
                  setNewBusiness(
                    searchResults.find((p) => p.id === e.target.value)
                  )
                )
              }
            >
              {searchResults.map((p) => (
                <MenuItem key={p.name} value={p.id}>
                  {p.name} ({p.address}, {p.zip_code})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      {status === 'choose-business' && !business && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => dispatch(connectBusinessAsync(newBusiness ?? ''))}
          >
            <SaveIcon />
            Save
          </Button>
          <Box marginLeft={2} display="inline">
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={() => dispatch(setStatus('yelp-not-set-up'))}
            >
              <ArrowBackIcon />
              Back
            </Button>
          </Box>
        </Grid>
      )}

      {status === 'choose-business' && business && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => dispatch(connectBusinessAsync(newBusiness ?? ''))}
          >
            <SaveIcon />
            Save
          </Button>
          <Box marginLeft={2} display="inline">
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={() => dispatch(setStatus('change'))}
            >
              <ArrowBackIcon />
              Back
            </Button>
          </Box>
        </Grid>
      )}

      {status === 'active' && business && (
        <Grid item xs={12}>
          <Alert variant="standard" severity="success">
            Your Yelp business <i>{business}</i> is connected.
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

      {status === 'change' && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => {
              if (searchObject) dispatch(searchBusinessAsync(searchObject));
            }}
          >
            <SearchIcon />
            Search
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
