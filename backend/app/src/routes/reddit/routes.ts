import { Router } from 'express';
import redditCommentRoutes from './comment';
import redditListingRoutes from './listing'

const redditRouter = Router();

redditRouter.use('/comments', redditCommentRoutes);

redditRouter.use('/listings', redditListingRoutes)

export default redditRouter;
