import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';
// import { TagData } from './WordCloudData'

type WordCloudQueryType = {
  cloudQuery: string;
};

export type DictWordCloudQuery = {
  [key in AppNames]: WordCloudQueryType;
};

export type WordCloudData = { value: string; count: number }[];

export type UseWordCloudrQuery = {
  data: WordCloudData | null | undefined;
  isLoading: boolean;
  error: string | null;
};