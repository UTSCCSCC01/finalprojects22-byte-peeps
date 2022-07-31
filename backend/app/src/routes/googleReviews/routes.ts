import { Router } from 'express';
import googleReviewsStatsRoutes from './stats';
import googleReviewsCommentRoutes from './comments';

const googleReviewsRouter = Router();

googleReviewsRouter.use('/stats', googleReviewsStatsRoutes);
googleReviewsRouter.use('/comments', googleReviewsCommentRoutes);

export default googleReviewsRouter;
