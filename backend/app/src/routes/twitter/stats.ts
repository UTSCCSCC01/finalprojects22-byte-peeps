import { Router } from 'express';
import { getTwitterStats } from '../../controllers/twitter/stats';

const twitterStatsRouter = Router();

twitterStatsRouter.get('/cards', getTwitterStats);

export default twitterStatsRouter;
