import React from 'react';
import { TagCloud } from 'react-tagcloud';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loader from '../../Loader/Loader';
import NoData from '../../NoData/NoData';
import { WordCloudData } from './WordCloudQueryTypes';
import './WordCloud.css';

interface Props {
  data: WordCloudData | null | undefined;
  isLoading: boolean;
  error: string | null;
}
const minFontSize = 13;
const maxFontSize = 20;

const WordCloud: React.FC<Props> = (props) => {
  const { data, isLoading, error } = props;

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (!data || data.length === 0) return <NoData />;

  return (
    <TagCloud
      colorOptions={{
        luminosity: 'dark',
        format: 'rgb',
      }}
      minSize={minFontSize}
      maxSize={maxFontSize}
      tags={data}
    />
  );
};

export default WordCloud;
