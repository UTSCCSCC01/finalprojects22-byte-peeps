import { RequestHandler } from 'express';
import FacebookComment from '../../models/facebook/comment';

/**
 * Provides the 50 most recent Facebook comments
 */
export const getComments: RequestHandler = async (req, res, next) => {
  const comments = await FacebookComment.findAll({
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
};

/**
 * Provides the 50 most recent Facebook comments belonging to the provided Media
 */
export const getCommentsByPostId: RequestHandler = async (req, res, next) => {
  const comments = await FacebookComment.findAll({
    where: { postId: req.params['postId'] },
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
};

/**
 * Provides the % of comments that are labeled as subjective
 */
export const getCommentsSubjectivityAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  const subjective = await FacebookComment.count({
    where: { subjectivityAnalysis: 'subjective' },
  });
  const notSubjective = await FacebookComment.count({
    where: { subjectivityAnalysis: 'not-subjective' },
  });
  res.send({
    'subjective': subjective,
    'not-subjective': notSubjective
  });
};

/**
 * Provides the % of comments that are labeled as positive, negative and neutral
 */
export const getCommentsSentimentAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  const positive = await FacebookComment.count({
    where: { sentimentAnalysis: 'positive' },
  });
  const neutral = await FacebookComment.count({
    where: { sentimentAnalysis: 'neutral' },
  });
  const negative = await FacebookComment.count({
    where: { sentimentAnalysis: 'negative' },
  });
  res.send({
    'positive': positive,
    'neutral': neutral,
    'negative': negative,
  });
};
