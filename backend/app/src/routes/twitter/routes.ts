import { Router } from 'express';
import twitterCommentRoutes from './comment';

const twitterRouter = Router();

twitterRouter.use('/comments', twitterCommentRoutes);

export default twitterRouter;
