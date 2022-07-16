import { CircularProgress } from '@mui/material';
import React from 'react';

const Loader: React.FC = () => (
  <div className="center fullDimension">
    <CircularProgress
      style={{
        margin: 'auto',
      }}
    />
  </div>
);

export default Loader;
