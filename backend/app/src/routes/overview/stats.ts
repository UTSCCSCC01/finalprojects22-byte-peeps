import { Router } from 'express';
import { getOverviewStats } from '../../controllers/overview/stats';

const overviewStatsRoutes = Router();

overviewStatsRoutes.get('/cards', getOverviewStats);

export default overviewStatsRoutes;
