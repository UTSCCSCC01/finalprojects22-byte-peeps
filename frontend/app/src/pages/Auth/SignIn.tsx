import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetSession } from '../../Components/AuthStorage/AuthStorage';
import { Notification } from '../../Components/Notification/Notification';
import { RoutePaths } from '../../Components/Router/RoutesConstants';
import { useAppDispatch } from '../../Redux/hooks';
import { signIn } from '../../Redux/Slices/user/userSlice';
import useNotification, {
  NotificationState,
} from '../../utils/hooks/Notification';
import './Auth.css';

let notification: NotificationState;
export function getSignInNotifcation(): NotificationState {
  return notification;
}

interface Props {}

const SignIn: React.FC<Props> = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [isSignedIn] = useGetSession();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  notification = useNotification({});

  useEffect(() => {
    if (isSignedIn) navigate(RoutePaths.Dashboard);
  }, [navigate, isSignedIn]);

  const handleLogin = () => {
    dispatch(signIn({ username: user, password: pwd }));
  };

  return (
    <Stack
      spacing={2}
      component="form"
      className="formContainer center"
      sx={{
        boxShadow: 1,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" align="center">
        Sign In{' '}
      </Typography>
      <TextField
        id="outlined-user-input"
        label="Username"
        type="username"
        required={true}
        inputProps={{ maxLength: 20 }}
        autoComplete="current-password"
        onChange={(event: any) => {
          setUser(event.target.value);
        }}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        required={true}
        autoComplete="current-password"
        onChange={(event: any) => {
          setPwd(event.target.value);
        }}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={handleLogin}
        className="authButton"
      >
        Sign In
      </Button>
      <div className="rowCenter footer">
        Do not have an account? &nbsp;
        <Link to={RoutePaths.SignUp}> Sign up here</Link>
      </div>
      <Notification state={notification} />
    </Stack>
  );
};

export default SignIn;
