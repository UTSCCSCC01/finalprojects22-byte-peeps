import { Router } from 'express';
import {
  connectUser,
  getSettings,
  populateFirstTime,
} from '../../controllers/setup/twitter';

const twitterRouter = Router();

twitterRouter.get('/settings', getSettings);
twitterRouter.post('/connect', connectUser);
twitterRouter.post('/populate', populateFirstTime);

export default twitterRouter;
