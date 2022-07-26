import { Router } from 'express';
import yelpStatsRoutes from './stats';

const yelpRouter = Router();

yelpRouter.use('/stats', yelpStatsRoutes);

export default yelpRouter;
