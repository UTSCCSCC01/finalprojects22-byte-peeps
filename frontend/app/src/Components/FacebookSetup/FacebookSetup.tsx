import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getCurrentPageAsync,
  retrievePagesAsync,
  saveCurrentPageAsync,
  selectCurrentPage,
  selectNotificationMessage,
  selectNotificationShown,
  selectNotificationType,
  selectPages,
  selectStage,
  setCurrentPage,
  setNotificationMessage,
  setNotificationShown,
  setNotificationType,
  setStage,
} from '../../Redux/Slices/facebookSetup/facebookSetupSlice';
import { Notification } from '../Notification/Notification';

export function FacebookSetup() {
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID ?? '';
  const facebookScopes =
    'email,pages_show_list,instagram_basic,pages_read_engagement,pages_read_user_content,public_profile';

  let stage = useAppSelector(selectStage);
  let pages = useAppSelector(selectPages);
  let currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentPageAsync());
  }, [dispatch]);

  const responseFacebook = (response: any) => {
    if (response.grantedScopes !== facebookScopes) {
      dispatch(setNotificationShown(true));
      dispatch(setNotificationType('error'));
      dispatch(setNotificationMessage('Invalid permissions provided!'));
      return;
    }
    dispatch(retrievePagesAsync(response.accessToken));
  };

  let buttonStyle: React.CSSProperties = { width: '100%', height: '100%' };
  let buttonText = undefined;

  return (
    <Grid container spacing={2}>
      {stage === 'inactive' && (
        <Grid item xs={12}>
          <Alert variant="standard" severity="warning">
            Your Facebook token has expired, please log in again.
          </Alert>
        </Grid>
      )}

      {(stage === 'inactive' || stage === 'logIn' || stage === 'change') && (
        <Grid item xs={12}>
          <FacebookLogin
            appId={facebookAppId}
            fields="accounts"
            scope={facebookScopes}
            returnScopes={true}
            callback={responseFacebook}
            size="small"
            icon="fa-facebook"
            buttonStyle={buttonStyle}
            textButton={buttonText}
          />
        </Grid>
      )}

      {stage === 'selectPage' && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="facebook-page-select-label">
              Facebook Page
            </InputLabel>
            <Select
              labelId="facebook-page-select-label"
              id="facebook-page-select"
              label="Facebook Page"
              onChange={(e) => dispatch(setCurrentPage(e.target.value))}
            >
              {pages.map((p) => (
                <MenuItem key={p.name} value={p.access_token}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      {stage === 'selectPage' && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => dispatch(saveCurrentPageAsync(currentPage ?? ''))}
          >
            <SaveIcon />
            Save
          </Button>
        </Grid>
      )}

      {stage === 'active' && currentPage && (
        <Grid item xs={12}>
          <Alert variant="standard" severity="success">
            Your Facebook page <i>{currentPage}</i> is connected.
          </Alert>
        </Grid>
      )}

      {stage === 'active' && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="info"
            size="large"
            onClick={() => dispatch(setStage('change'))}
          >
            <EditIcon />
            Change
          </Button>
        </Grid>
      )}

      {stage === 'change' && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={() => dispatch(setStage('active'))}
          >
            <DoDisturbIcon />
            Cancel
          </Button>
        </Grid>
      )}

      <Notification
        message={useAppSelector(selectNotificationMessage)}
        type={useAppSelector(selectNotificationType)}
        show={useAppSelector(selectNotificationShown)}
        dispatchHide={() => dispatch(setNotificationShown(false))}
      />
      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={stage === 'loading'}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
