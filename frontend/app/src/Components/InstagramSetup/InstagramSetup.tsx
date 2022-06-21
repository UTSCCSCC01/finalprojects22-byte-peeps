import { useEffect } from 'react';
import { Alert, Backdrop, CircularProgress, Grid, MenuItem, Select, InputLabel, FormControl, Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getSettingsAsync, saveCurrentPageAsync, selectCurrentPageId, selectNotificationMessage, selectNotificationShown, selectNotificationType, selectPages, selectStatus, setNotificationShown, setCurrentPageId } from '../../Redux/Slices/instagramSetup/instagramSetupSlice';
import { Notification } from '../Notification/Notification';

export function InstagramSetup() {
  const status = useAppSelector(selectStatus);
  const pages = useAppSelector(selectPages);
  const currentPageId = useAppSelector(selectCurrentPageId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSettingsAsync());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {status === "fb-not-set-up" &&
        <Grid item xs={12}>
          <Alert variant="filled" severity="warning">
            Facebook has not been set up yet, please set up your Facebook page and ensure that it is <a target="_blank" href="https://help.instagram.com/176235449218188">connected</a> to the Instagram account you are trying to set up.
          </Alert>
        </Grid> 
      }

      {status === "ig-not-set-up" &&
        <Grid item xs={12}>
          <Alert variant="filled" severity="info">
            Instagram accounts displayed are based on what is connected to your Facebook page. If the account you are trying to set up isn't there, please <a target="_blank" href="https://help.instagram.com/176235449218188">connect</a> it.
          </Alert>
        </Grid>
      }

      {status === 'inactive' &&
        <Grid item xs={12}>
          <Alert variant="filled" severity="warning">
            It seems that your Facebook token has expired. Since the Instagram setup relies on Facebook, please refresh your Facebook token and try again.
          </Alert>
        </Grid>
      }

      {status !== 'fb-not-set-up' && status !== 'inactive' &&
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="instagram-page-select-label">Instagram Page</InputLabel>
            <Select
              labelId="instagram-page-select-label"
              id="instagram-page-select"
              label="Instagram Page"
              onChange={e => dispatch(setCurrentPageId(e.target.value))}
              value={currentPageId ?? ""}
              >
              {pages.map(p =>
                <MenuItem key={p.name} value={p.id}>{p.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      }
      {status !== 'fb-not-set-up' && status !== 'inactive' &&
        <Grid item xs={12}>
          <Button variant="contained" color="success" size='large' onClick={() => dispatch(saveCurrentPageAsync(currentPageId ?? ""))}>
            <SaveIcon/>Save
          </Button>
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
        open={status === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
