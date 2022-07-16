import { Router } from 'express';
import redditCommentRoutes from './comment';

import redditListingRoutes from './listing'

import redditStatsRoutes from './stats';


const redditRouter = Router();

redditRouter.use('/comments', redditCommentRoutes);
redditRouter.use('/stats', redditStatsRoutes);

redditRouter.use('/listings', redditListingRoutes)

export default redditRouter;
