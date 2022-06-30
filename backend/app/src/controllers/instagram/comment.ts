import { RequestHandler } from 'express';
import InstagramApi from '../../models/instagram/api';
import InstagramComment from '../../models/instagram/comment';
import InstagramMedia from '../../models/instagram/media';
import User from '../../models/user/user';

/**
 * Provides the 50 most recent Instagram comments
 */
export const getComments: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({where: { username: req.session.username }, include: InstagramApi});
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const media = await InstagramMedia.findAll({ where: { apiId: user!.instagramApi.id }});
    const mediaIds: number[] = media.map(m => m.id);
    const comments = await InstagramComment.findAll({ where: {mediaId: mediaIds}, order: [['date', 'DESC']], attributes: ['id', 'userName', 'message', 'likes', 'sentimentAnalysis', 'topicClassification', 'subjectivityAnalysis'] });
    const filteredComments = comments.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
    res.send({ count: comments.length, data: filteredComments });
  } catch(e) {
    console.log(e)
    res.status(500).send();
  }
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
