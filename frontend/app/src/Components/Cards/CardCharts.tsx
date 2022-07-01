import React from 'react';
import { CardContent, Card } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const CardCharts: React.FC<Props> = (props) => {
  return (
    <Card>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default CardCharts;
