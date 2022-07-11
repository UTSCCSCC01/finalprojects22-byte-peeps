import { Router } from 'express';
import { getComments } from '../../controllers/reddit/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);

export default commentRouter;
