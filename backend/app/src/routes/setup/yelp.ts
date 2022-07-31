import { Router } from 'express';
import {
  connectBusiness,
  getSettings,
  populateFirstTime,
  searchBusiness,
} from '../../controllers/setup/yelp';

const yelpRouter = Router();

yelpRouter.get('/settings', getSettings);
yelpRouter.get('/search', searchBusiness);
yelpRouter.post('/connect', connectBusiness);
yelpRouter.post('/populate', populateFirstTime);

export default yelpRouter;
