import React from 'react';
import CardGenerator from '../CardsGenerator/CardGenerator';
import useCardsHeaderQuery from './CardsHeaderQuery';

interface Props {
  postId?: number;
  variant?: 'outlined' | 'elevation';
}

const CardsHeader: React.FC<Props> = (props) => {
  const { data, dataLength, isLoading, error } = useCardsHeaderQuery(
    props.postId
  );

  return (
    <CardGenerator
      cardData={data}
      cardDataLength={data?.length ?? dataLength}
      isLoading={isLoading}
      error={error}
      variant={props.variant}
    />
  );
};

export default CardsHeader;
