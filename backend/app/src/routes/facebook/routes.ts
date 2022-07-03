import { Router } from 'express';
import facebookPostRoutes from './post';
import facebookCommentRoutes from './comment';
import facebookStats from './stats';

const facebookRouter = Router();

facebookRouter.use('/posts', facebookPostRoutes);
facebookRouter.use('/comments', facebookCommentRoutes);
facebookRouter.use('/stats', facebookStats);

export default facebookRouter;
