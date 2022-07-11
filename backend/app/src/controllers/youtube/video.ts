import { RequestHandler } from 'express';
import YouTubeVideo from '../../models/youtube/video';

export const getAllVideos: RequestHandler = async (req, res, next) => {
  const allVideos: YouTubeVideo[] = await YouTubeVideo.findAll();
  return res.status(200).json({ data: allVideos });
};

export const getVideoById: RequestHandler = async (req, res, next) => {};
