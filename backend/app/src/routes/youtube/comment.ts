import { Router } from 'express';
import { getWordCloudData } from '../../controllers/instagram/comment';
import {
  getAllComments,
  getCommentById,
  getComments,
} from '../../controllers/youtube/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/', getAllComments);
commentRouter.get('/:id', getCommentById);

commentRouter.delete('/:id', deleteComment);

commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
