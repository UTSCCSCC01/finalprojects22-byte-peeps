import { Router } from 'express';
import facebookPostRoutes from './post';
import facebookCommentRoutes from './comment';
import facebookStatsRoutes from './stats';

const facebookRouter = Router();

facebookRouter.use('/posts', facebookPostRoutes);
facebookRouter.use('/comments', facebookCommentRoutes);
facebookRouter.use('/stats', facebookStatsRoutes);

export default facebookRouter;
