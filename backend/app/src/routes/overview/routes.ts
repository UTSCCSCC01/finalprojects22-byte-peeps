import { Router } from 'express';
import overviewStatsRoutes from './stats';

const overviewRouter = Router();

overviewRouter.use('/stats', overviewStatsRoutes);

export default overviewRouter;
