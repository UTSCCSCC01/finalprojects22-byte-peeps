import { RequestHandler } from 'express';
import FacebookPost from '../../models/facebook/post';

/**
 * Provides the 50 most recent Facebook post
 */
export const getPosts: RequestHandler = async (req, res, next) => {
  const comments = await FacebookPost.findAll({
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
};
