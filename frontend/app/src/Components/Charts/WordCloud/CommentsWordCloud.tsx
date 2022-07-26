import React from 'react';
import WordCloud from './WordCloud';
import useCommentsWordCloud from './CommentsWordCloudHook';
import { AppNames } from '../../../Redux/Slices/webApp/webAppConstants';

interface Props {
  appName: AppNames;
}

const CommentsWordCloud: React.FC<Props> = (props) => {
  const query = useCommentsWordCloud(props.appName);

  return <WordCloud {...query}></WordCloud>;
};

export default CommentsWordCloud;
