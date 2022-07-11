import { Card, CardContent } from '@mui/material';
import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import NoData from '../NoData/NoData';
import './Card.css';

export type CardData = {
  name: string;
  value: number | null;
  icon: React.ReactElement;
};

interface CardInfoProps {
  data: CardData | null;
  isLoading: Boolean;
  error: String | null;
}

const CardInfo: React.FC<CardInfoProps> = (props) => {
  const { data, isLoading, error } = props;

  let content: React.ReactElement | React.ReactNode | null = null;
  if (isLoading) content = <Loader />;
  else if (error) content = <ErrorMessage error={error} />;
  else if (data) {
    content = (
      <div className="center">
        <div className="cardTitle">{data.name}</div>
        <div className="rowCenter cardInfo">
          {data.value ? data.value : <NoData />}
          <div className="center cardIcon">{data.icon}</div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="cardContent">{content}</CardContent>
    </Card>
  );
};

export default CardInfo;
