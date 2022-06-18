import { Alert, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getSettingsAsync,
  saveCurrentPageAsync,
  selectCurrentPage,
  selectDisplaySettingsSaved,
  selectPages,
  selectSaveButtonStatus,
  selectStatus,
  setCurrentPage,
  setDisplaySettingsSaved,
} from '../../Redux/Slices/facebookLoginWrapper/facebookLoginWrapperSlice';
import { green } from '@mui/material/colors';

const responseFacebook = (response: any) => {
  // TODO: Send access token for backend to do its work
};

export function FacebookLoginWrapper() {
  const facebook_app_id = process.env.REACT_APP_FACEBOOK_APP_ID ?? '';

  let status = useAppSelector(selectStatus);
  let saveButtonStatus = useAppSelector(selectSaveButtonStatus);
  let displaySettingsSaved = useAppSelector(selectDisplaySettingsSaved);
  let pages = useAppSelector(selectPages);
  let currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSettingsAsync());
  }, [dispatch]);

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
      borderColor: 'green',
      cursor: 'not-allowed',
    };
    buttonText = 'Logged in with Facebook';
    buttonDisabled = true;
    selectDisabled = false;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FacebookLogin
          appId={facebook_app_id}
          fields="accounts"
          scope="pages_show_list,pages_read_engagement,pages_read_user_content"
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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={displaySettingsSaved}
        autoHideDuration={2000}
        onClose={() => dispatch(setDisplaySettingsSaved(false))}
        key={"snackbarFacebookLoginWrapper"}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Page setting has been saved successfully!
          </Alert>
        </Snackbar>
    </Grid>
  );
}
