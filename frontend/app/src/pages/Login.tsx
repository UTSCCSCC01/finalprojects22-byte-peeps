import { Button, Box, Typography, Stack, TextField, AppBar, Toolbar, Backdrop} from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import background from './background.png'

export interface ILoginProps {};

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const login = useNavigate();
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
                mt: '10%'
                }}>
                <Stack spacing={2}>
                    <Typography component="h1" align='center'>Sign in </Typography>
                    <TextField
                        id="outlined-user-input"
                        label="Username"
                        type="username"
                        autoComplete="current-password"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Button fullWidth variant='contained' onClick={() => login('/dashboard')}>Login</Button>
                </Stack>
            </Box>
        </>  
  );
}

export default Login
