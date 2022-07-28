import { Router } from 'express';
import googleReviewsStatsRoutes from './stats';
import googleReviewsCommentRouter from './comment';

const googleReviewsRouter = Router();

googleReviewsRouter.use('/stats', googleReviewsStatsRoutes);
googleReviewsRouter.use('/comments', googleReviewsCommentRouter);

export default googleReviewsRouter;
