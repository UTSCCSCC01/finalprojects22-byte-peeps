import { Router } from 'express';
import { getRedditStats } from '../../controllers/reddit/stats';

const redditStatsRoutes = Router();

redditStatsRoutes.get('/cards', getRedditStats);

export default redditStatsRoutes;
