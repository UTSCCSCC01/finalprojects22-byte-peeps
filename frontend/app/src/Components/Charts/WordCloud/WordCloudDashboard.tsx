import React from 'react';
import WordCloud from './WordCloud';
import useWordCloudDashboard from './WordCloudDashboardHook';

const CommentsWordCloud = () => {
  const { data, isLoading, error } = useWordCloudDashboard();

  return (
    <WordCloud data={data} isLoading={isLoading} error={error}></WordCloud>
  );
};

export default CommentsWordCloud;
