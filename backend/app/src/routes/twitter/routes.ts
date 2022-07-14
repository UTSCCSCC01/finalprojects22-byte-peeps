import { Router } from 'express';
import twitterCommentRoutes from './comment';
import twitterTweetRoutes from './tweet'

const twitterRouter = Router();

twitterRouter.use('/comments', twitterCommentRoutes);
twitterRouter.use('/tweets', twitterTweetRoutes)

export default twitterRouter;
