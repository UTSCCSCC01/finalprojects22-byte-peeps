import { Router } from 'express';
import redditCommentRoutes from './comment';
import redditStatsRoutes from './stats';

const redditRouter = Router();

redditRouter.use('/comments', redditCommentRoutes);
redditRouter.use('/stats', redditStatsRoutes);

export default redditRouter;
