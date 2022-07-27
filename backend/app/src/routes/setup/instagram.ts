import { Router } from 'express';
import {
  connectPage,
  getSettings,
  populateFirstTime,
} from '../../controllers/setup/instagram';

const instagramRouter = Router();

instagramRouter.get('/settings', getSettings);
instagramRouter.post('/connect', connectPage);
instagramRouter.post('/populate', populateFirstTime);

export default instagramRouter;
