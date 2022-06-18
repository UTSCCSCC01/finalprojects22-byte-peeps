import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getSettingsAsync,
  saveCurrentPageAsync,
  selectCurrentPage,
  selectNotificationMessage,
  selectNotificationShown,
  selectNotificationType,
  selectPages,
  selectSaveButtonStatus,
  selectStatus,
  setCurrentPage,
  setNotificationMessage,
  setNotificationShown,
  setNotificationType
} from '../../Redux/Slices/facebookLoginWrapper/facebookLoginWrapperSlice';
import { green } from '@mui/material/colors';
import { Notification } from '../Notification/Notification';

export function FacebookLoginWrapper() {
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID ?? '';
  const facebookScopes = "email,pages_show_list,pages_read_engagement,pages_read_user_content,public_profile"

  let status = useAppSelector(selectStatus);
  let saveButtonStatus = useAppSelector(selectSaveButtonStatus);
  let pages = useAppSelector(selectPages);
  let currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSettingsAsync());
  }, [dispatch]);

  const responseFacebook = (response: any) => {
    if (response.grantedScopes !== facebookScopes) {
      dispatch(setNotificationShown(true));
      dispatch(setNotificationType('error'));
      dispatch(setNotificationMessage("Invalid permissions provided!"));
    }
  };

  let buttonStyle: React.CSSProperties = { width: '100%', height: '100%' };
  let buttonText = undefined;
  let buttonDisabled = false;
  let selectDisabled = true;
  if (status === 'loading') {
    buttonText = 'Loading status...';
    buttonStyle.cursor = 'not-allowed';
    buttonDisabled = true;
    selectDisabled = true;
  } else if (status === 'loggedIn') {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: 'green',
      borderColor: 'green'
    };
    buttonText = 'Logged in with Facebook';
    selectDisabled = false;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FacebookLogin
          appId={facebookAppId}
          fields="accounts"
          scope={facebookScopes}
          returnScopes={true}
          callback={responseFacebook}
          size="small"
          icon="fa-facebook"
          isDisabled={buttonDisabled}
          buttonStyle={buttonStyle}
          textButton={buttonText}
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="facebook-page-select-label">Facebook Page</InputLabel>
          <Select
            labelId="facebook-page-select-label"
            id="facebook-page-select"
            value={currentPage ?? ""}
            label="Facebook Page"
            onChange={e => dispatch(setCurrentPage(e.target.value))}
            disabled={selectDisabled}
          >
            <MenuItem disabled value="">
              <em>Select a Page</em>
            </MenuItem>
            {pages.map(p =>
              <MenuItem key={p.value} value={p.value}>{p.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="success" size='large' disabled={status !== "loggedIn"} onClick={() => dispatch(saveCurrentPageAsync(currentPage ?? ""))}>
          <SaveIcon/>Save
          {saveButtonStatus === 'loading' && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
          </Button>
      </Grid>
      <Notification
        message={useAppSelector(selectNotificationMessage)}
        type={useAppSelector(selectNotificationType)}
        show={useAppSelector(selectNotificationShown)}
        dispatchHide={() => dispatch(setNotificationShown(false))}
      />
    </Grid>
  );
}
