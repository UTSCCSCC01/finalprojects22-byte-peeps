import { Router } from 'express';
import { connectBusiness, getSettings, searchBusiness } from '../../controllers/setup/yelp';

const yelpRouter = Router();

yelpRouter.get('/settings', getSettings);
yelpRouter.get('/search', searchBusiness);
yelpRouter.post('/connect', connectBusiness);

export default yelpRouter;
