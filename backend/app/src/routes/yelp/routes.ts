import { Router } from 'express';
import yelpStatsRoutes from './stats';
import yelpCommentRoutes from './comments';
const yelpRouter = Router();

yelpRouter.use('/stats', yelpStatsRoutes);
yelpRouter.use('/comments', yelpCommentRoutes);

export default yelpRouter;
