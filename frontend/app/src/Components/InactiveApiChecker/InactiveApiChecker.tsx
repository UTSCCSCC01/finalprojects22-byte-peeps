import { Alert, Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import * as facebookSetupSlice from '../../Redux/Slices/facebookSetup/facebookSetupSlice';
import * as instagramSetupSlice from '../../Redux/Slices/instagramSetup/instagramSetupSlice';

export function InactiveApiChecker() {
  const dispatch = useAppDispatch();
  const facebookStage = useAppSelector(facebookSetupSlice.selectStage);
  const instagramStatus = useAppSelector(instagramSetupSlice.selectStatus);

  useEffect(() => {
    dispatch(facebookSetupSlice.getCurrentPageAsync());
    dispatch(instagramSetupSlice.getSettingsAsync());
  }, [dispatch]);

  const [facebookAlertShown, setFacebookAlertShown] = useState(
    sessionStorage.getItem('setFacebookAlertShown') == null
      ? true
      : JSON.parse(sessionStorage.getItem('setFacebookAlertShown')!)
  );
  const [instagramAlertShown, setInstagramAlertShown] = useState(
    sessionStorage.getItem('setInstagramAlertShown') == null
      ? true
      : JSON.parse(sessionStorage.getItem('setInstagramAlertShown')!)
  );

  const handleHideFacebookAlert = () => {
    sessionStorage.setItem('setFacebookAlertShown', 'false');
    setFacebookAlertShown(false);
  };
  const handleHideInstagramAlert = () => {
    sessionStorage.setItem('setInstagramAlertShown', 'false');
    setInstagramAlertShown(false);
  };

  return (
    <>
      <Collapse in={facebookStage === 'inactive' && facebookAlertShown}>
        <Alert
          style={{ margin: '10px 5px 0 5px' }}
          severity="warning"
          onClose={handleHideFacebookAlert}
        >
          Your Facebook page token has become inactive! Please go to the setup
          page and reconnect your page for the dashboard to display up to date
          data.
        </Alert>
      </Collapse>

      <Collapse in={instagramStatus === 'inactive' && instagramAlertShown}>
        <Alert
          style={{ margin: '5px' }}
          severity="warning"
          onClose={handleHideInstagramAlert}
        >
          Your Instagram account is dependent on your Facebook page. Since your
          Facebook page token is inactive, we are unable to display up to date
          data for your Instagram account until it is refreshed.
        </Alert>
      </Collapse>
    </>
  );
}
