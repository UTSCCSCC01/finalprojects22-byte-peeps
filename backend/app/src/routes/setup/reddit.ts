import { Router } from 'express';
import { connectSubreddit, getSettings } from '../../controllers/setup/reddit';

const redditRouter = Router();

redditRouter.get('/settings', getSettings);
redditRouter.post('/connect', connectSubreddit);

export default redditRouter;
