import { RequestHandler } from 'express';
import InstagramTag from '../../models/instagram/tag';

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
  const notSubjective = await InstagramTag.count({
    where: { subjectivityAnalysis: 'not-subjective' },
  });
  res.send({
    subjective: subjective,
    'not-subjective': notSubjective,
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
    where: { sentimentAnalysis: 'positive' },
  });
  const neutral = await InstagramTag.count({
    where: { sentimentAnalysis: 'neutral' },
  });
  const negative = await InstagramTag.count({
    where: { sentimentAnalysis: 'negative' },
  });
  res.send({
    positive: positive,
    neutral: neutral,
    negative: negative,
  });
};
