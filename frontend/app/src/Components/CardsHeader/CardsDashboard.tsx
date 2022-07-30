import React from 'react';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import CardGenerator from '../CardsGenerator/CardGenerator';
import useCardsDashboardQuery from './CardsDashboardQuery';

const CardsDashboard = () => {
  const { data, dataLength, isLoading, error } = useCardsDashboardQuery();

  return (
    <CardGenerator
      cardData={data}
      cardDataLength={data?.length ?? dataLength}
      isLoading={isLoading}
      error={error}
      //   variant={props.variant}
    />
  );
};

export default CardsDashboard;
