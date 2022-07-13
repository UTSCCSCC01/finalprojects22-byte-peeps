import { Router } from 'express';
import redditCommentRoutes from './comment';

const redditRouter = Router();

redditRouter.use('/comments', redditCommentRoutes);

export default redditRouter;
