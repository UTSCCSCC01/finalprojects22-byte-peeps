import React from 'react';
import CardGenerator from '../CardsGenerator/CardGenerator';
import useCardsHeaderQuery from './CardsHeaderQuery';

interface Props {}

const CardsHeader: React.FC<Props> = () => {
  const { data, dataLength, isLoading, error } = useCardsHeaderQuery();
  
  return (
    <CardGenerator
      cardData={data}
      cardDataLength={dataLength}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default CardsHeader;
