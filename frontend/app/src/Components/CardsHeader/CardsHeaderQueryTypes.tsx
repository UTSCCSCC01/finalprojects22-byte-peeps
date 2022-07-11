import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { CardData } from '../Cards/CardInfo';

type CardHeaderQueryType = {
  cardQuery: string;
  cardNames: { [key: string]: string };
  cardIcons: { [key: string]: React.ReactElement };
  cardLength: number;
};

export type DictCardHeaderQuery = {
  [key in AppNames]: CardHeaderQueryType;
};

export type UseCardsHeaderQuery = {
  data: CardData[] | undefined | null;
  isLoading: boolean;
  dataLength: number;
  error: string | null;
};
