import { RequestHandler } from 'express';
import InstagramTag from '../../models/instagram/tag';
import { SentimentAnalysisStatus } from '.././enums';

/**
 * Provides the 50 most recent Instagram tags
 */
export const getTags: RequestHandler = async (req, res, next) => {
  const comments = await InstagramTag.findAll({
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
};

/**
 * Provides the % of tags that are labeled as subjective
 */
export const getTagsSubjectivityAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  const subjective = await InstagramTag.count({
    where: { subjectivityAnalysis: 'subjective' },
  });
  const objective = await InstagramTag.count({
    where: { subjectivityAnalysis: 'objective' },
  });
  res.send({
    subjective: subjective,
    objective: objective,
  });
};

/**
 * Provides the % of tags that are labeled as positive, negative and neutral
 */
export const getTagsSentimentAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  const positive = await InstagramTag.count({
    where: { sentimentAnalysis: SentimentAnalysisStatus.Positive },
  });
  const neutral = await InstagramTag.count({
    where: { sentimentAnalysis: SentimentAnalysisStatus.Neutral },
  });
  const negative = await InstagramTag.count({
    where: { sentimentAnalysis: SentimentAnalysisStatus.Negative },
  });
  res.send({
    positive: positive,
    neutral: neutral,
    negative: negative,
  });
};
