import { Router } from 'express';
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

export default commentRouter;
