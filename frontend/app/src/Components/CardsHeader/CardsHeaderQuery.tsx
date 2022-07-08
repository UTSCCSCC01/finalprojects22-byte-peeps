import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../Redux/Slices/dateSelector/dateSelectorSlice';
import { AppNames } from '../../Redux/Slices/global/globalReduxConstants';
import { selectAppName } from '../../Redux/Slices/global/globalSlice';
import { ErrorResponse } from '../../utils/enums';
import HTTP from '../../utils/http';
import { extractBackendError } from '../../utils/httpHelpers';
import { CardData } from '../Cards/CardInfo';
import CardHeaderIcons from './CardsHeaderIconConst';
import CardHeaderNames from './CardsHeaderNameConst';
import {
  CardHeaderResponse,
  CardHeaderURLRequest,
} from './CardsHeaderURLConst';

function formatData(
  cardNames: { [key: string]: string },
  cardData: { [key: string]: number } | null,
  cardIcons: { [key: string]: React.ReactElement }
): CardData[] | null {
  if (!cardData) return null;

  const fromattedCardStatsData: any[] = [];

  Object.keys(cardData).forEach((key: string) => {
    fromattedCardStatsData.push({
      name: cardNames[key],
      value: cardData[key],
      icon: cardIcons[key],
    });
  });

  return fromattedCardStatsData;
}

type chooseAppType = {
  cardQuery: string;
  cardNames: { [key: string]: string };
  cardIcons: { [key: string]: React.ReactElement };
  cardLength: number;
};

function chooseApp(appName: string): chooseAppType {
  switch (appName) {
    case AppNames.Facebook:
      return {
        cardQuery: CardHeaderURLRequest.FacebookCardHeader,
        cardNames: CardHeaderNames.FacebookCardNames,
        cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
        cardIcons: CardHeaderIcons.FacebookCardIcons,
      };
    case AppNames.Instagram:
      return {
        cardQuery: CardHeaderURLRequest.FacebookCardHeader,
        cardNames: CardHeaderNames.FacebookCardNames,
        cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
        cardIcons: CardHeaderIcons.FacebookCardIcons,
      };
    case AppNames.Twitter:
      return {
        cardQuery: CardHeaderURLRequest.FacebookCardHeader,
        cardNames: CardHeaderNames.FacebookCardNames,
        cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
        cardIcons: CardHeaderIcons.FacebookCardIcons,
      };
    case AppNames.YouTube:
      return {
        cardQuery: CardHeaderURLRequest.FacebookCardHeader,
        cardNames: CardHeaderNames.FacebookCardNames,
        cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
        cardIcons: CardHeaderIcons.FacebookCardIcons,
      };
    case AppNames.Reddit:
      return {
        cardQuery: CardHeaderURLRequest.FacebookCardHeader,
        cardNames: CardHeaderNames.FacebookCardNames,
        cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
        cardIcons: CardHeaderIcons.FacebookCardIcons,
      };
    case AppNames.GoogleReviews:
      return {
        cardQuery: CardHeaderURLRequest.FacebookCardHeader,
        cardNames: CardHeaderNames.FacebookCardNames,
        cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
        cardIcons: CardHeaderIcons.FacebookCardIcons,
      };
    case AppNames.Yelp:
      return {
        cardQuery: CardHeaderURLRequest.FacebookCardHeader,
        cardNames: CardHeaderNames.FacebookCardNames,
        cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
        cardIcons: CardHeaderIcons.FacebookCardIcons,
      };
    default:
      return {
        cardQuery: '',
        cardNames: {},
        cardLength: 0,
        cardIcons: {},
      };
  }
}

function useCardsHeaderQuery() {
  const appName = useAppSelector(selectAppName);

  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const { cardQuery, cardNames, cardIcons, cardLength } = chooseApp(appName);

  const getHeaderCardsData = async (
    startDate: string,
    endDate: string
  ): Promise<CardHeaderResponse> => {
    return await HTTP.get(
      `${cardQuery}?start=${startDate}&end=${endDate}`
    ).then((res) => res.data);
  };

  const query = useQuery<
    CardHeaderResponse,
    AxiosError<ErrorResponse>,
    CardData[] | null,
    string[]
  >(
    ['headerCardsData', startDate, endDate],
    () => getHeaderCardsData(startDate, endDate),
    {
      select: React.useCallback(
        (data: CardHeaderResponse) => formatData(cardNames, data, cardIcons),
        [cardNames, cardIcons]
      ),
    }
  );

  return {
    ...query,
    dataLength: cardLength,
    error: extractBackendError(query.error),
  };
}

export default useCardsHeaderQuery;
