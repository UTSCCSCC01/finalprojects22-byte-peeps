import React from 'react';
import { TagCloud } from 'react-tagcloud';
import useWordCloud from './WordCloudHook';

interface Props {}

const WordCloud: React.FC<Props> = () => {
  const { data, isLoading, error } = useWordCloud();

  return <TagCloud minSize={12} maxSize={35} tags={data} />;
};

export default WordCloud;
