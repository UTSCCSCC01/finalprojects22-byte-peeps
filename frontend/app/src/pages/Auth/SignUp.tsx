import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Notification } from '../../Components/Notification/Notification';
import { RoutePaths } from '../../Components/Router/RoutesConstants';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { selectSignUpStatus, signUp } from '../../Redux/Slices/user/userSlice';
import useNotification, {
  NotificationState,
} from '../../utils/hooks/Notification';
import './Auth.css';

let notification: NotificationState;
export function getSignUpNotification(): NotificationState {
  return notification;
}

interface Props {}

const SignUp: React.FunctionComponent<Props> = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const dispatch = useAppDispatch();
  notification = useNotification({});

  const isSignedUp = useAppSelector(selectSignUpStatus);

  const handleRegister = () => {
    dispatch(signUp({ username: user, password: pwd }));
  };

  useEffect(() => {
    if (isSignedUp) {
      setUser('');
      setPwd('');
    }
  }, [isSignedUp]);

  return (
    <Stack
      spacing={2}
      className="center formContainer"
      sx={{
        boxShadow: 1,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" align="center">
        Sign Up{' '}
      </Typography>
      <TextField
        id="outlined-user-input"
        label="Username"
        type="username"
        required={true}
        autoComplete="current-password"
        onChange={(event) => {
          setUser(event.target.value);
        }}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        required={true}
        autoComplete="current-password"
        onChange={(event) => {
          setPwd(event.target.value);
        }}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={handleRegister}
        className="authButton"
      >
        Sign Up
      </Button>

      <div className="rowCenter footer">
        Ready to login? &nbsp;
        <Link to={RoutePaths.SignIn}> Sign in here</Link>
      </div>

      <Notification state={notification} />
    </Stack>
  );
};

export default SignUp;
