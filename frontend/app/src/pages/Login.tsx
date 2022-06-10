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
const REGISTER_URL = 'user/register';

export interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const login = useNavigate();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
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
    } catch (err) {
      console.log(err);
    }
  };
  const handleRegister = async () => {
    try {
      const response = await HTTP.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('registration successful');
    } catch (err) {
      console.log(err);
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
      <Box
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
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
        <Stack spacing={2}>
          <Typography component="h1" align="center">
            Sign up{' '}
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
            onClick={handleRegister}
            // onClick={() => login('/dashboard')}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
