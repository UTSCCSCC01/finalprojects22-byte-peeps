import { Router } from 'express';
import { getComments } from '../../controllers/youtube/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);

export default commentRouter;
