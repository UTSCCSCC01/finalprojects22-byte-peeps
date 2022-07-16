import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../Redux/Slices/dateSelector/dateSelectorSlice';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { selectAppName } from '../../Redux/Slices/webApp/webAppSlice';
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
  cardIcons: { [key: string]: React.ReactNode }
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
    cardQuery: CardHeaderURLRequest.InstagramCardHeader,
    cardNames: CardHeaderNames.InstagramCardNames,
    cardLength: Object.keys(CardHeaderNames.InstagramCardNames).length,
    cardIcons: CardHeaderIcons.InstagramCardIcons,
  },
  [AppNames.Twitter]: {
    cardQuery: CardHeaderURLRequest.TwitterCardHeader,
    cardNames: CardHeaderNames.TwitterCardNames,
    cardLength: Object.keys(CardHeaderNames.TwitterCardNames).length,
    cardIcons: CardHeaderIcons.TwitterCardIcons,
  },
  [AppNames.YouTube]: {
    cardQuery: CardHeaderURLRequest.YouTubeCardHeader,
    cardNames: CardHeaderNames.YouTubeCardNames,
    cardLength: Object.keys(CardHeaderNames.YouTubeCardNames).length,
    cardIcons: CardHeaderIcons.YouTubeCardIcons,
  },
  [AppNames.Reddit]: {
    cardQuery: CardHeaderURLRequest.RedditCardHeader,
    cardNames: CardHeaderNames.RedditCardNames,
    cardLength: Object.keys(CardHeaderNames.RedditCardNames).length,
    cardIcons: CardHeaderIcons.RedditCardIcons,
  },
  [AppNames.GoogleReviews]: {
    cardQuery: '',
    cardNames: {},
    cardLength: 0,
    cardIcons: {},
  },
  [AppNames.Yelp]: {
    cardQuery: '',
    cardNames: {},
    cardLength: 0,
    cardIcons: {},
  },
  [AppNames.default]: {
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

  const { cardQuery, cardLength, cardNames, cardIcons } =
    AppCardHeaderQuery[appName];

  const getHeaderCardsData = async (): Promise<CardHeaderResponse> => {
    return await HTTP.get(cardQuery, {
      params: {
        startDate,
        endDate,
      }
    }).then((res) => res.data);
  };

  const query = useQuery<
    CardHeaderResponse,
    AxiosError<ErrorResponse>,
    CardData[] | null
  >(
    ['headerCardsData', appName, startDate, endDate], // the states that change the query go here
    () => getHeaderCardsData(),
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
