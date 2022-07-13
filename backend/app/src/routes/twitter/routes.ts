import { Router } from 'express';
import twitterCommentRoutes from './comment';
import twitterStatsRouter from './stats';

const twitterRouter = Router();

twitterRouter.use('/comments', twitterCommentRoutes);
twitterRouter.use('/stats', twitterStatsRouter);

export default twitterRouter;
