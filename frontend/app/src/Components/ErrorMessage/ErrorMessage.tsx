import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  error: String | null;
}

const ErrorMessage: React.FC<Props> = (props: Props) => {
  return (
    <Typography variant="subtitle2" align="center" paragraph>
      {props.error}
    </Typography>
  );
};

export default ErrorMessage;
