import { Router } from 'express';
import { getYoutubeStats } from '../../controllers/youtube/stats';

const youtubeStatsRoutes = Router();

youtubeStatsRoutes.get('/cards', getYoutubeStats);

export default youtubeStatsRoutes;
