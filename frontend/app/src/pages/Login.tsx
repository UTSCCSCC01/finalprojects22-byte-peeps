import {
  Button,
  Box,
  Typography,
  Stack,
  TextField,
  AppBar,
  Toolbar,
  Backdrop,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from './background.png';
import { useState } from 'react';
import { setTokenSourceMapRange } from 'typescript';
import HTTP from '../utils/http';
import { Directions } from '@mui/icons-material';
const LOGIN_URL = 'user/login';

export interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const login = useNavigate();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const handleLogin = async () => {
    try {
      const response = await HTTP.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      login('/dashboard');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setErrMsg('Username or password incorrect!');
      }
    }
  };

  return (
    <>
      {/* <div 
            style={{
                backgroundImage: background,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "200px",
                height: "200px"}}>
            </div> */}

      <Box
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        // minHeight="50vh"
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 5,
          width: '25%',
          m: 'auto',
          mt: '10%',
        }}
      >
        <p style={{ color: 'red' }}>{errMsg}</p>
        <Stack spacing={2}>
          <Typography component="h1" align="center">
            Sign in{' '}
          </Typography>
          <TextField
            id="outlined-user-input"
            label="Username"
            type="username"
            autoComplete="current-password"
            onChange={(event) => {
              setUser(event.target.value);
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event) => {
              setPwd(event.target.value);
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            // onClick={() => login('/dashboard')}
          >
            Login
          </Button>
        </Stack>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <p>Do not have an account?</p>
        <a href="/register">Register here</a>
      </div>
    </>
  );
};

export default Login;
