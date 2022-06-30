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
import FacebookLogin from 'react-facebook-login';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  retrievePagesAsync,
  saveCurrentPageAsync,
  selectCurrentPage,
  selectPages,
  selectStage,
  setCurrentPage,
} from '../../Redux/Slices/facebookSetup/facebookSetupSlice';
import useNotification, {
  NotificationState,
} from '../../utils/hooks/Notification';
import { Notification } from '../Notification/Notification';

let notification: NotificationState;
export function getFacebookSetupNotification(): NotificationState {
  return notification;
}

export function FacebookSetup() {
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID ?? '';
  const facebookScopes =
    'email,pages_show_list,instagram_basic,pages_read_engagement,pages_read_user_content,public_profile';

  notification = useNotification({});
  let stage = useAppSelector(selectStage);
  let pages = useAppSelector(selectPages);
  let currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  const responseFacebook = (response: any) => {
    if (response.grantedScopes !== facebookScopes) {
      notification.setMessage('Invalid permissions provided!');
      notification.setType('error');
      notification.setShown(true);
      return;
    }
    dispatch(retrievePagesAsync(response.accessToken));
  };

  let buttonStyle: React.CSSProperties = { width: '100%', height: '100%' };
  let buttonText = undefined;
  if (stage === 'selectPage' || stage === 'active') {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: 'green',
      borderColor: 'green',
    };
    buttonText = 'Logged In';
  }
  if (stage === 'active') {
    buttonText += ' with ' + currentPage;
  }

  return (
    <Grid container spacing={2}>
      {stage === 'inactive' && (
        <Grid item xs={12}>
          <Alert variant="standard" severity="warning">
            Your Facebook token has expired, please log in again.
          </Alert>
        </Grid>
      )}

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

      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={stage === 'loading'}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Notification state={notification} />
    </Grid>
  );
}
