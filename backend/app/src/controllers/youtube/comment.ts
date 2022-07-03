import { RequestHandler } from 'express';
import YoutubeComment from '../../models/youtube/comment';

export const createComment: RequestHandler = async (req, res, next) => {};

export const deleteComment: RequestHandler = async (req, res, next) => {};

export const getAllComments: RequestHandler = async (req, res, next) => {
  const allComments: YoutubeComment[] = await YoutubeComment.findAll();
  return res.status(200).json({ data: allComments });
};

export const getCommentById: RequestHandler = async (req, res, next) => {};
