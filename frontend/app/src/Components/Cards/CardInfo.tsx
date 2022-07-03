import React from 'react';
import { CardContent, Card } from '@mui/material';
import { Loader, ErrorMessage } from '../Charts/PieChart/PieChartAnalysis';

export interface CardInfoProps {
  error: String | null;
  isLoading: Boolean;
  children: React.ReactNode;
}

const CardInfo: React.FC<CardInfoProps> = (props: CardInfoProps) => {
  const { children, error, isLoading }: CardInfoProps = props;

  return (
    <Card>
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '10px',
          flexWrap: 'wrap',
        }}
      >
        {isLoading ? (
          <Loader />
        ) : error !== null ? (
          <ErrorMessage error={error} />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
};

export default CardInfo;
