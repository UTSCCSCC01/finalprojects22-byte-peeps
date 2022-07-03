import { Router } from 'express';
import { connectUser, getSettings } from '../../controllers/setup/twitter';

const twitterRouter = Router();

twitterRouter.get('/settings', getSettings);
twitterRouter.post('/connect', connectUser);

export default twitterRouter;
