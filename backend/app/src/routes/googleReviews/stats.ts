import { Router } from 'express';
import { getGoogleReviewsStats } from '../../controllers/googleReviews/stats';

const googleReviewsStatsRoutes = Router();

googleReviewsStatsRoutes.get('/cards', getGoogleReviewsStats);

export default googleReviewsStatsRoutes;
