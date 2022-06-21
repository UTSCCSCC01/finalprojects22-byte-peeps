import { useEffect } from 'react';
import { Alert, Backdrop, CircularProgress, Grid, Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getSettingsAsync, selectPage, selectNotificationMessage, selectNotificationShown, selectNotificationType, selectStatus, setNotificationShown, connectPageAsync, selectConnectedPage } from '../../Redux/Slices/instagramSetup/instagramSetupSlice';
import { Notification } from '../Notification/Notification';

export function InstagramSetup() {
  const status = useAppSelector(selectStatus);
  const page = useAppSelector(selectPage);
  const connectedPage = useAppSelector(selectConnectedPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSettingsAsync());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {status === "fb-not-set-up" &&
        <Grid item xs={12}>
          <Alert variant="standard" severity="warning">
            Facebook has not been set up yet, please set up your Facebook page and ensure that it is <a target="_blank" href="https://help.instagram.com/176235449218188">connected</a> to the Instagram account you are trying to set up.
          </Alert>
        </Grid> 
      }

      {status === "ig-not-set-up" &&
        <Grid item xs={12}>
          <Alert variant="standard" severity="info">
             The displayed Instagram account below is based on what is connected to your Facebook page. If the account you are trying to set up isn't the same, please look into <a target="_blank" href="https://help.instagram.com/176235449218188">connecting</a> it to your Facebook page.
          </Alert>
        </Grid>
      }

      {status === 'inactive' &&
        <Grid item xs={12}>
          <Alert variant="standard" severity="warning">
            It seems that your Facebook token has expired. Since the Instagram setup relies on Facebook, please refresh your Facebook token and try again.
          </Alert>
        </Grid>
      }

      {status === 'active' && page === connectedPage &&
        <Grid item xs={12}>
          <Alert variant="standard" severity="info">
            Your Instagram account <i>{page}</i> is already connected. If you would like to set up another page, you have to <a target="_blank" href="https://help.instagram.com/176235449218188">connect</a> it to your set-up Facebook page
          </Alert>
        </Grid>
      }

      {status === 'active' && page !== connectedPage &&
        <Grid item xs={12}>
          <Alert variant="standard" severity="info">
            We have detected a different account to be set up than the one that is already connected (<i>{connectedPage}</i>). You may connect it below.
          </Alert>
        </Grid>
      }

      { (status === "ig-not-set-up" || (status === 'active' && page !== connectedPage)) &&
        <Grid item xs={12}>
          <Button variant="contained" color="success" size='large' onClick={() => dispatch(connectPageAsync())}>
            <SaveIcon/>CONNECT TO {page?.toUpperCase()}
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
