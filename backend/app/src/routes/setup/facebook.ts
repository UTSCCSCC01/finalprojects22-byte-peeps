import { Router } from 'express';
import {
  connectPage,
  getCurrentPage,
  getPages,
} from '../../controllers/setup/facebook';

const facebookRouter = Router();

facebookRouter.get('/pages', getPages);
facebookRouter.get('/page', getCurrentPage);
facebookRouter.post('/connect', connectPage);

export default facebookRouter;
