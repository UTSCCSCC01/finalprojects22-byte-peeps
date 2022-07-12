import { Router } from 'express';
import {
  getAllComments,
  getCommentById,
  getComments,
} from '../../controllers/youtube/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/', getAllComments);
commentRouter.get('/:id', getCommentById);

export default commentRouter;
