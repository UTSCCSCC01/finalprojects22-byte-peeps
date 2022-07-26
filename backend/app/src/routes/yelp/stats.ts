import { Router } from 'express';
import { getYelpStats } from '../../controllers/yelp/stats';

const yelpStatsRoutes = Router();

yelpStatsRoutes.get('/cards', getYelpStats);

export default yelpStatsRoutes;
