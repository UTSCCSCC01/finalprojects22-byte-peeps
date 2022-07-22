import { Router } from 'express';
import googleReviewsStatsRoutes from './stats';

const googleReviewsRouter = Router();

googleReviewsRouter.use('/stats', googleReviewsStatsRoutes);

export default googleReviewsRouter;
