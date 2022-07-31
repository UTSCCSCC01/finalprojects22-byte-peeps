import React from 'react';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import CardGenerator from '../CardsGenerator/CardGenerator';
import useCardsHeaderQuery from './CardsHeaderQuery';

interface Props {
  appName: AppNames;
  postId?: number;
  variant?: 'outlined' | 'elevation';
}

const CardsHeader: React.FC<Props> = (props) => {
  const { data, dataLength, isLoading, error } = useCardsHeaderQuery(
    props.appName,
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
