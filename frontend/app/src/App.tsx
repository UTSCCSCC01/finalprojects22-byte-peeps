import React from 'react';
import RouterComponent from './Components/Router/RouterComponent';
import './App.css';
import { ThemeProvider } from '@mui/material';
import MuiTheme from './Components/MuiTheme/MuiTheme';

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <RouterComponent />;
    </ThemeProvider>
  );
};

export default App;
