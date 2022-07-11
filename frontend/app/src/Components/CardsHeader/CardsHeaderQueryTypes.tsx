import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { CardData } from '../Cards/CardInfo';

type CardHeaderQueryType = {
  cardQuery: string;
  cardNames: { [key: string]: string };
  cardIcons: { [key: string]: React.ReactElement };
  cardLength: number;
};

type DictCardHeaderQueryType = {
  [key in AppNames]: CardHeaderQueryType;
};

export interface DictCardHeaderQuery extends DictCardHeaderQueryType {
  default: CardHeaderQueryType;
}

export type UseCardsHeaderQuery = {
  data: CardData[] | undefined | null;
  isLoading: boolean;
  dataLength: number;
  error: string | null;
};
