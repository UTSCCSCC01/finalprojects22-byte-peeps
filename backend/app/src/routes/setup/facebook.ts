import { Router } from 'express';
import {
  connectPage,
  getCurrentPage,
  getPages,
  populateFirstTime,
} from '../../controllers/setup/facebook';

const facebookRouter = Router();

facebookRouter.get('/pages', getPages);
facebookRouter.get('/page', getCurrentPage);
facebookRouter.post('/connect', connectPage);
facebookRouter.post('/populate', populateFirstTime);

export default facebookRouter;
