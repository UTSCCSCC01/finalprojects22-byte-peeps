import React from 'react';
import WordCloud from './WordCloud';
import useCommentsWordCloud from './CommentsWordCloudHook';

interface Props {}

const CommentsWordCloud: React.FC<Props> = () => {
  const query = useCommentsWordCloud();

  return <WordCloud {...query}></WordCloud>;
};

export default CommentsWordCloud;
