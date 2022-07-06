import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  selectSignUpError,
  selectSignUpStatus,
  selectUserErrorMessage,
  signUp,
} from '../../Redux/Slices/user/userSlice';
import { RoutePaths } from '../../Components/Router/RoutesConstants';
import './Auth.css';

interface Props {}

const SignUp: React.FunctionComponent<Props> = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const dispatch = useAppDispatch();

  const isSignedUp = useAppSelector(selectSignUpStatus);
  const isSignUpError = useAppSelector(selectSignUpError);
  const userErrorMsg = useAppSelector(selectUserErrorMessage);

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
        <Button fullWidth variant="contained" onClick={handleRegister}>
          Sign Up
        </Button>
      </Stack>

      {isSignedUp && <p style={{ color: 'green' }}>Signed up successfully!</p>}
      {isSignUpError && <p style={{ color: 'red' }}>{userErrorMsg}</p>}

      <div className="rowCenter signUp">
        Ready to login? &nbsp;
        <Link to={RoutePaths.SignIn}> Sign in here</Link>
      </div>
    </Box>
  );
};

export default SignUp;
