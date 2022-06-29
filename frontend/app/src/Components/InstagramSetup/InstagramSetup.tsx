import { useEffect } from 'react';
import { Alert, Backdrop, CircularProgress, Grid, Button } from '@mui/material';
import PowerIcon from '@mui/icons-material/Power';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
    getSettingsAsync,
    selectPage,
    selectStatus,
    connectPageAsync,
    selectConnectedPageId,
} from '../../Redux/Slices/instagramSetup/instagramSetupSlice';
import useNotification, { NotificationState } from '../../utils/hooks/Notification';
import { Notification } from '../Notification/Notification';

let notification: NotificationState;
export function getInstagramSetupNotification(): NotificationState {
  return notification;
}

export function InstagramSetup() {
    notification = useNotification({});
    const status = useAppSelector(selectStatus);
    const page = useAppSelector(selectPage);
    const connectedPageId = useAppSelector(selectConnectedPageId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSettingsAsync());
    }, [dispatch]);

    return (
        <Grid container spacing={2}>
            {status === 'fb-not-set-up' && (
                <Grid item xs={12}>
                    <Alert variant="standard" severity="warning">
                        Facebook has not been set up yet, please set up your
                        Facebook page and ensure that it is{' '}
                        <a
                            target="_blank"
                            href="https://help.instagram.com/176235449218188"
                            rel="noreferrer"
                        >
                            connected
                        </a>{' '}
                        to the Instagram account you are trying to set up.
                    </Alert>
                </Grid>
            )}

            {status === 'ig-not-set-up' && page && (
                <Grid item xs={12}>
                    <Alert variant="standard" severity="info">
                        The displayed Instagram account below is based on what
                        is connected to your Facebook page. If the account you
                        are trying to set up isn't the same, please look into{' '}
                        <a
                            target="_blank"
                            href="https://help.instagram.com/176235449218188"
                            rel="noreferrer"
                        >
                            connecting
                        </a>{' '}
                        it to your Facebook page.
                    </Alert>
                </Grid>
            )}

            {(status === 'ig-not-set-up' || status === 'active') && !page && (
                <Grid item xs={12}>
                    <Alert variant="standard" severity="error">
                        You either have not provided access to any Instagram
                        account when setting up your Facebook page or do not
                        have an Instagram account associated with the Facebook
                        page to begin with. Please fix this issue and set up
                        Facebook again with the proper permissions.
                    </Alert>
                </Grid>
            )}

            {status === 'inactive' && (
                <Grid item xs={12}>
                    <Alert variant="standard" severity="warning">
                        It seems that your Facebook token has expired. Since the
                        Instagram setup relies on Facebook, please refresh your
                        Facebook token and try again.
                    </Alert>
                </Grid>
            )}

            {status === 'active' && page && page?.id === connectedPageId && (
                <Grid item xs={12}>
                    <Alert variant="standard" severity="info">
                        Your Instagram account <i>{page.name}</i> is connected.
                        If you would like to set up another page, you have to{' '}
                        <a
                            target="_blank"
                            href="https://help.instagram.com/176235449218188"
                            rel="noreferrer"
                        >
                            connect
                        </a>{' '}
                        it to your set-up Facebook page
                    </Alert>
                </Grid>
            )}

            {status === 'active' && page && page!.id !== connectedPageId && (
                <Grid item xs={12}>
                    <Alert variant="standard" severity="info">
                        We have detected a different account to be set up than
                        the one that is already connected. You may connect it
                        below.
                    </Alert>
                </Grid>
            )}

            {((status === 'ig-not-set-up' && page) ||
                (status === 'active' &&
                    page &&
                    page!.id !== connectedPageId)) && (
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={() => dispatch(connectPageAsync())}
                    >
                        <PowerIcon />
                        CONNECT TO {page?.name.toUpperCase()}
                    </Button>
                </Grid>
            )}

            <Backdrop
                sx={{ color: '#fff', zIndex: 1000 }}
                open={status === 'loading'}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Notification state={notification} />
        </Grid>
    );
}
