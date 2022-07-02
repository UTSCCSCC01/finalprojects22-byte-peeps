import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { LockOutlined } from '@mui/icons-material';
import {
  selectSignInError,
  selectUserErrorMessage,
  signIn,
} from '../../Redux/Slices/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { RoutePaths } from '../../RoutesConstants';

interface Props {}

const SignIn: React.FunctionComponent<Props> = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSignInError = useAppSelector(selectSignInError);
  const userErrorMsg = useAppSelector(selectUserErrorMessage);

  const handleLogin = () => {
    dispatch(signIn({ username: user, password: pwd }));
    navigate(RoutePaths.Dashboard);
  };

  return (
    <Box
      component="form"
      className="formContainer"
      sx={{
        boxShadow: 1,
      }}
    >
      <Stack spacing={2} className="center">
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
        <Button fullWidth variant="contained" onClick={handleLogin}>
          Sign In
        </Button>
      </Stack>

      {isSignInError && <p style={{ color: 'red' }}>{userErrorMsg}</p>}

      <div className="rowCenter signUp">
        Do not have an account? &nbsp;
        <Link to={RoutePaths.SignUp}> Sign up here</Link>
      </div>
    </Box>
  );
};

export default SignIn;
