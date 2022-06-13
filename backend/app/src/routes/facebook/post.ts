import { Router } from 'express';
import { getPosts } from '../../controllers/facebook/post';

const postRouter = Router();

postRouter.get('/', getPosts);

export default postRouter;
