import { Alert, Snackbar } from '@mui/material';
import { NotificationState } from '../../utils/hooks/Notification';

export interface NotificationProps {
  state: NotificationState
}

export function Notification(props: NotificationProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={props.state.shown}
      autoHideDuration={2000}
      onClose={() => props.state.setShown(false)}>
        <Alert severity={props.state.type} sx={{ width: '100%' }}>
          {props.state.message}
        </Alert>
      </Snackbar>
  );
}
