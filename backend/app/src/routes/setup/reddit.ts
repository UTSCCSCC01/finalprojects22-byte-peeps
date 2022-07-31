import { Router } from 'express';
import {
  connectSubreddit,
  getSettings,
  populateFirstTime,
} from '../../controllers/setup/reddit';

const redditRouter = Router();

redditRouter.get('/settings', getSettings);
redditRouter.post('/connect', connectSubreddit);
redditRouter.post('/populate', populateFirstTime);

export default redditRouter;
