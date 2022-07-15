import React from 'react';
import TagCloud, { WordCloudProps } from './WordCloud';
import { SentimentAnalysisColors } from '../../../utils/enums';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import {
  selectError,
  selectIsSentimentAnalysisLoading,
  selectSentimentAnalysis,
} from '../../../Redux/Slices/facebook/facebookSlice';

interface Props {}

const WordCloudWrapper: React.FC<Props> = () => {
  // Sentiment Analysis (PieChart)
  const dataRetured = useAppSelector(selectSentimentAnalysis);
  const error = useAppSelector(selectError);
  const isSentimentAnalysisLoading = useAppSelector(
    selectIsSentimentAnalysisLoading
  );

  const data = [
    { name: 'Positve', value: 0 },
    { name: 'Negative', value: 0 },
    { name: 'Neutral', value: 0 },
  ];

  let isDataPresent: Boolean | null = null;

  if (dataRetured) {
    data[0].value = dataRetured.positive;
    data[1].value = dataRetured.negative;
    data[2].value = dataRetured.neutral;
    isDataPresent =
      data[0].value > 0 || data[1].value > 0 || data[2].value > 0
        ? true
        : data[0].value === 0 || data[1].value === 0 || data[2].value === 0
        ? false
        : null;
  }

  const COLORS = [
    SentimentAnalysisColors.Positive,
    SentimentAnalysisColors.Neutral,
    SentimentAnalysisColors.Negative,
  ];

  const facebookSentimentAnalysis: WordCloudProps = {
    data,
    isLoading: isSentimentAnalysisLoading,
    error,
    isDataPresent,
    COLORS,
  };
  return (
    <>
      <TagCloud {...facebookSentimentAnalysis} />
    </>
  );
};

export default WordCloudWrapper;
