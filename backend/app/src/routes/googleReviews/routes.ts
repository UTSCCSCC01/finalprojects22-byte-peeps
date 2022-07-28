import { Router } from 'express';
import googleReviewsStatsRoutes from './stats';
import googleReviewsCommentRouter from './comment';

const googleReviewsRouter = Router();

googleReviewsRouter.use('/stats', googleReviewsStatsRoutes);
googleReviewsRouter.use('/comment', googleReviewsCommentRouter);

export default googleReviewsRouter;
