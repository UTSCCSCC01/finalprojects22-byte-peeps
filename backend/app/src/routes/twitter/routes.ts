import { Router } from 'express';
import twitterCommentRoutes from './comment';

import twitterTweetRoutes from './tweet'

import twitterStatsRouter from './stats';


const twitterRouter = Router();

twitterRouter.use('/comments', twitterCommentRoutes);

twitterRouter.use('/tweets', twitterTweetRoutes)

twitterRouter.use('/stats', twitterStatsRouter);


export default twitterRouter;
