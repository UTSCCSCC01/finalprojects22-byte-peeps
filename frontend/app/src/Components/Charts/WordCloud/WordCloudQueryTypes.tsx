import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
import { TagData } from './WordCloudData'

type WordCloudQueryType = {
  cloudQuery: string;
};

export type DictWordCloudQuery = {
  [key in AppNames]: WordCloudQueryType;
};

export type UseWordCloudrQuery = {
  data: TagData[] | undefined | null;
  isLoading: boolean;
  error: string | null;
};
