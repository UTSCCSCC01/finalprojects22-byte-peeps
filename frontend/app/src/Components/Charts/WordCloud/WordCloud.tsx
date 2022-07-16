import React from 'react';
import { TagCloud } from 'react-tagcloud';
import useWordCloud from './WordCloudHook';

interface Props {}

const WordCloud: React.FC<Props> = () => {
  const { data, isLoading, error } = useWordCloud();
  if (data) {
    return <TagCloud minSize={12} maxSize={35} tags={data} />;
  } else {
    return <TagCloud minSize={12} maxSize={35} tags={[]} />;
  }
};

export default WordCloud;
