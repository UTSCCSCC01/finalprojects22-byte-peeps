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
  const [msg, setMsg] = useState('');
  const [success, toggleSuccess] = useState(true);

  const handleRegister = async () => {
    try {
      const response = await HTTP.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setMsg('registration successful!');
      console.log(success);
    } catch (err: any) {
      if (err.response?.status === 409) {
        toggleSuccess(false);
        setMsg('username already exists');
      }
    }
  };
  return (
    <>
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
        {success ? (
          <p style={{ color: 'green' }}>{msg}</p>
        ) : (
          <p style={{ color: 'red' }}>{msg}</p>
        )}

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <p>Ready to login?</p>
        <a href="/">Back to login</a>
      </div>
    </>
  );
};

export default Login;
