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

const WordCloud: React.FC<Props> = (props) => {
  const { data, isLoading, error } = props;

  if (isLoading) return <Loader />;
  if (!data) return <NoData className="noData center" />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <TagCloud
      colorOptions={{
        luminosity: 'dark',
        format: 'rgb',
      }}
      minSize={10}
      maxSize={18}
      tags={data}
    />
  );
};

export default WordCloud;
