import { Alert, Snackbar } from '@mui/material';

interface NotificationProperties {
  type: 'success' | 'error' | 'info' | 'warning',
  message: string,
  show: boolean,
  dispatchHide: () => void
}

export function Notification(props: NotificationProperties) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={props.show}
      autoHideDuration={2000}
      onClose={props.dispatchHide}>
        <Alert severity={props.type} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
  );
}
