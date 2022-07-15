import { Router } from 'express';
import { getWordCloudData } from '../../controllers/instagram/comment';
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
} from '../../controllers/youtube/comment';

const commentRouter = Router();

commentRouter.post('/create', createComment);

commentRouter.get('/', getAllComments);

commentRouter.get('/:id', getCommentById);

commentRouter.delete('/:id', deleteComment);

commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
