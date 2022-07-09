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
  DictCardHeaderQuery,
  UseCardsHeaderQuery,
} from './CardsHeaderQueryTypes';
import {
  CardHeaderResponse,
  CardHeaderURLRequest,
} from './CardsHeaderURLConst';

/**
 * @summary Formats the return of the card header data to match the CardDate[] type otherwise null if there is no correct response
 * @param { { [key: string]: string }} cardNames
 * @param {{ [key: string]: number } | null} cardData - null if response fails
 * @param {{ [key: string]: React.ReactElement }} cardIcons
 * @return {CardData[] | null} - null if response fails
 */
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

const AppCardHeaderQuery: DictCardHeaderQuery = {
  [AppNames.Facebook]: {
    cardQuery: CardHeaderURLRequest.FacebookCardHeader,
    cardNames: CardHeaderNames.FacebookCardNames,
    cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
    cardIcons: CardHeaderIcons.FacebookCardIcons,
  },
  [AppNames.Instagram]: {
    cardQuery: CardHeaderURLRequest.FacebookCardHeader,
    cardNames: CardHeaderNames.FacebookCardNames,
    cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
    cardIcons: CardHeaderIcons.FacebookCardIcons,
  },
  [AppNames.Twitter]: {
    cardQuery: CardHeaderURLRequest.FacebookCardHeader,
    cardNames: CardHeaderNames.FacebookCardNames,
    cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
    cardIcons: CardHeaderIcons.FacebookCardIcons,
  },
  [AppNames.YouTube]: {
    cardQuery: CardHeaderURLRequest.FacebookCardHeader,
    cardNames: CardHeaderNames.FacebookCardNames,
    cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
    cardIcons: CardHeaderIcons.FacebookCardIcons,
  },
  [AppNames.Reddit]: {
    cardQuery: CardHeaderURLRequest.FacebookCardHeader,
    cardNames: CardHeaderNames.FacebookCardNames,
    cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
    cardIcons: CardHeaderIcons.FacebookCardIcons,
  },
  [AppNames.GoogleReviews]: {
    cardQuery: CardHeaderURLRequest.FacebookCardHeader,
    cardNames: CardHeaderNames.FacebookCardNames,
    cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
    cardIcons: CardHeaderIcons.FacebookCardIcons,
  },
  [AppNames.Yelp]: {
    cardQuery: CardHeaderURLRequest.FacebookCardHeader,
    cardNames: CardHeaderNames.FacebookCardNames,
    cardLength: Object.keys(CardHeaderNames.FacebookCardNames).length,
    cardIcons: CardHeaderIcons.FacebookCardIcons,
  },
  default: {
    cardQuery: '',
    cardNames: {},
    cardLength: 0,
    cardIcons: {},
  },
};

/**
 * Custom hook to get the card header data depending on the platform using useQuery()
 * @return {UseCardsHeaderQuery} useQuery() hook types alongside other extensions
 */
function useCardsHeaderQuery(): UseCardsHeaderQuery {
  const appName = useAppSelector(selectAppName);

  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const { cardQuery, cardNames, cardIcons, cardLength } =
    AppCardHeaderQuery[appName || 'default'];

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
    CardData[] | null
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
    data: query.data,
    isLoading: query.isLoading,
    dataLength: cardLength,
    error: extractBackendError(query.error),
  };
}

export default useCardsHeaderQuery;
