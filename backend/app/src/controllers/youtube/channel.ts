import { RequestHandler } from 'express';
import YouTubeChannel from '../../models/youtube/channel';

export const getAllChannels: RequestHandler = async (req, res, next) => {
  const allChannels: YouTubeChannel[] = await YouTubeChannel.findAll();
  return res.status(200).json({ data: allChannels });
};

export const getChannelById: RequestHandler = async (req, res, next) => {};
