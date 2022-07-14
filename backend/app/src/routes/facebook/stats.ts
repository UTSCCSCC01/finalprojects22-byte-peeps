import { Router } from 'express';
import { getFacebookStats } from '../../controllers/facebook/stats';

const facebookStatsRoutes = Router();

facebookStatsRoutes.get('/cards', getFacebookStats);

export default facebookStatsRoutes;
