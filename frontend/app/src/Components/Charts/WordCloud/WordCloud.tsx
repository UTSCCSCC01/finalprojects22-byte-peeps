import React from 'react';
import { TagCloud } from 'react-tagcloud';
import { ResponsiveContainer } from 'recharts';
import { useAppSelector } from '../../../Redux/hooks';
import { selectUserName } from '../../../Redux/Slices/user/userSlice';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loader from '../../Loader/Loader';
import NoData from '../../NoData/NoData';

interface SeriesData {
  name: String;
  value: Number;
}

export interface WordCloudProps {
  COLORS: string[];
  data: SeriesData[];
  isLoading: Boolean;
  error: String | null;
  isDataPresent: Boolean | null;
}

interface WordCloudComponentProps {
  data: SeriesData[];
  COLORS: string[];
}

const WordCloudComponent = ({ data, COLORS }: WordCloudComponentProps) => (
  <ResponsiveContainer width="95%" height={260}>
    <TagCloud minSize={12} maxSize={35} colorOptions={COLORS} tags={data} />
  </ResponsiveContainer>
);

const WordCloudAnalysis = ({
  COLORS,
  data,
  isLoading,
  error,
  isDataPresent,
}: WordCloudProps) => {
  const username = useAppSelector(selectUserName);

  return isLoading ? (
    <Loader />
  ) : isDataPresent && username === 'data' ? (
    <WordCloudComponent data={data} COLORS={COLORS} />
  ) : (!isDataPresent && error === null) || username !== 'data' ? (
    <NoData className="noData center" />
  ) : (
    <ErrorMessage error={error} />
  );
};

export default WordCloudAnalysis;
