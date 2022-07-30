import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../Redux/Slices/dateSelector/dateSelectorSlice';
// import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { ErrorResponse } from '../../utils/enums';
import HTTP from '../../utils/http';
import { extractBackendError } from '../../utils/httpHelpers';
import { CardData } from '../Cards/CardInfo';
import CardHeaderIcons from './CardsHeaderIconConst';
import CardHeaderNames from './CardsHeaderNameConst';
import { UseCardsHeaderQuery } from './CardsHeaderQueryTypes';
import {
  CardHeaderResponse,
  CardHeaderURLRequest,
} from './CardsHeaderURLConst';

// /**
//  * @summary Formats the return of the card header data to match the CardDate[] type otherwise null if there is no correct response
//  * @param { { [key: string]: string }} cardNames
//  * @param {{ [key: string]: number } | null} cardData - null if response fails
//  * @param {{ [key: string]: React.ReactElement }} cardIcons
//  * @return {CardData[] | null} - null if response fails
//  */
export enum AppNames {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Twitter = 'Twitter',
  YouTube = 'YouTube',
  Reddit = 'Reddit',
  GoogleReviews = 'Google Reviews',
  Yelp = 'Yelp',
}
type CardHeaderQueryType = {
  cardQuery: string;
  cardNames: { [key: string]: string };
  cardIcons: { [key: string]: React.ReactElement };
  cardLength: number;
};

type DictCardHeaderQuery = {
  [key in AppNames]: CardHeaderQueryType;
};
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

const AppCardDashboardQuery: DictCardHeaderQuery = {
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
  [AppNames.Yelp]: {
    cardQuery: CardHeaderURLRequest.YelpCardHeader,
    cardNames: CardHeaderNames.YelpCardNames,
    cardLength: Object.keys(CardHeaderNames.YelpCardNames).length,
    cardIcons: CardHeaderIcons.YelpCardIcons,
  },
  [AppNames.GoogleReviews]: {
    cardQuery: CardHeaderURLRequest.GoogleReviewsCardHeader,
    cardNames: CardHeaderNames.GoogleReviewsCardNames,
    cardLength: Object.keys(CardHeaderNames.GoogleReviewsCardNames).length,
    cardIcons: CardHeaderIcons.GoogleReviewsCardIcons,
  },
};

// /**
//  * Custom hook to get the card header data depending on the platform using useQuery()
//  * @return {UseCardsHeaderQuery} useQuery() hook types alongside other extensions
//  */
function useCardsDashboardQuery(): UseCardsHeaderQuery {
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const getHeaderCardsData = async (
    startDate: string,
    endDate: string,
    cardQuery: string,
    postId?: number
  ): Promise<any> => {
    const params = postId
      ? { startDate, endDate, postId }
      : { startDate, endDate };
    return await HTTP.get(cardQuery, { params }).then((res) => res.data);
  };

  const queries = Object.values(AppCardDashboardQuery);

  //   const query = useQuery<
  //     CardHeaderResponse,
  //     AxiosError<ErrorResponse>,
  //     CardData[] | null
  //   >(
  //     ['headerCardsData', appName, startDate, endDate, postId], // the states that change the query go here
  //     () => getHeaderCardsData(startDate, endDate, postId),
  //     {
  //       select: React.useCallback(
  //         (data: CardHeaderResponse) => formatData(cardNames, data, cardIcons),
  //         [cardNames, cardIcons]
  //       ),
  //     }
  //   );

  const query = useQuery(
    queries.map((app) => {
      return {
        queryKey: [
          'headerCardsData',
          app.cardNames,
          startDate,
          endDate,
          app.cardQuery,
        ],
        queryFn: () => getHeaderCardsData(startDate, endDate, app.cardQuery),
      };
    })
  );

  //   query.forEach((item) => {
  //     if (item.data) {
  //       //#posts
  //       //#likes
  //       //#mentions
  //       //avg
  //     } else {
  //       isLoading = item.isLoading;
  //       if (item.error) {
  //         const itemError: any = item.error;
  //         error = itemError?.message as string;
  //       }
  //     }
  //   });

  return {
    data: null,
    isLoading: false,
    dataLength: 0,
    error: null,
  };
}

export default useCardsDashboardQuery;
