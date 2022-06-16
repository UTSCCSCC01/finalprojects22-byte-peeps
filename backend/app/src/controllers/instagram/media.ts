import { RequestHandler } from 'express';
import InstagramMedia from '../../models/instagram/media';

/**
 * Provides the 50 most recent Instagram media
 */
export const getMedia: RequestHandler = async (req, res, next) => {
  const comments = await InstagramMedia.findAll({
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
};
