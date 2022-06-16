import { RequestHandler } from 'express';
import InstagramComment from '../../models/instagram/comment';

/**
 * Provides the 50 most recent Instagram comments
 */
export const getComments: RequestHandler = async (req, res, next) => {
  const comments = await InstagramComment.findAll({
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
};

/**
 * Provides the 50 most recent Instagram comments belonging to the provided Media
 */
export const getCommentsByMediaId: RequestHandler = async (req, res, next) => {
  const comments = await InstagramComment.findAll({
    where: { mediaId: req.params['mediaId'] },
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
  const subjective = await InstagramComment.count({
    where: { subjectivityAnalysis: 'subjective' },
  });
  const objective = await InstagramComment.count({
    where: { subjectivityAnalysis: 'objective' },
  });
  res.send({
    'subjective': subjective,
    'objective': objective
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
  const positive = await InstagramComment.count({
    where: { sentimentAnalysis: 'positive' },
  });
  const neutral = await InstagramComment.count({
    where: { sentimentAnalysis: 'neutral' },
  });
  const negative = await InstagramComment.count({
    where: { sentimentAnalysis: 'negative' },
  });
  res.send({
    'positive': positive,
    'neutral': neutral,
    'negative': negative,
  });
};
