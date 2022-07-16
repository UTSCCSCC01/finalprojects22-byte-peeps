import { ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import MuiTheme from './Components/MuiTheme/MuiTheme';
import RouterComponent from './Components/Router/RouterComponent';

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <RouterComponent />
    </ThemeProvider>
  );
};

export default App;
