import { Router } from 'express';
import { getComments } from '../../controllers/twitter/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);

export default commentRouter;
