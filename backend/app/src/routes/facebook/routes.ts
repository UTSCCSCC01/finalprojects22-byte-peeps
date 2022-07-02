import { Router } from 'express';
import facebookPostRoutes from './post';
import facebookCommentRoutes from './comment';

const facebookRouter = Router();

facebookRouter.use('/posts', facebookPostRoutes);
facebookRouter.use('/comments', facebookCommentRoutes);

export default facebookRouter;
