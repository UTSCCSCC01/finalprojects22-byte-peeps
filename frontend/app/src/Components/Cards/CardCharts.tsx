import React from 'react';
import { CardContent, Card, CardHeader } from '@mui/material';
import './Card.css';

interface Props {
  name: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'elevation' | 'outlined';
}

const CardCharts: React.FC<Props> = (props) => {
  return (
    <Card variant={props.variant ?? 'elevation'}>
      <CardHeader
        title={<div className="cardTitle">{props.name}</div>}
        action={props.action}
      />
      <CardContent className="cardChartContent">
        <div className="center" style={{ minHeight: '325px' }}>
          {props.children}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardCharts;
