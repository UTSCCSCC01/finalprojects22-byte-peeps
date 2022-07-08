import React from 'react';
import { CardContent, Card } from '@mui/material';
import './Card.css';

interface Props {
  name: string;
  children: React.ReactNode;
}

const CardCharts: React.FC<Props> = (props) => {
  return (
    <Card>
      <CardContent className="cardChartContent">
        <div className="cardTitle">{props.name}</div>
        <div className="center">{props.children}</div>
      </CardContent>
    </Card>
  );
};

export default CardCharts;
