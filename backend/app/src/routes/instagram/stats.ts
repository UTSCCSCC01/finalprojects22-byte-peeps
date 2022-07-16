import { Router } from 'express';
import { getInstagramStats } from '../../controllers/instagram/stats';

const instagramStatsRoutes = Router();

instagramStatsRoutes.get('/cards', getInstagramStats);

export default instagramStatsRoutes;
