import { Router } from 'express';
import { connectUser, getSettings } from '../../controllers/setup/youtube';

const youtubeRouter = Router();

youtubeRouter.get('/settings', getSettings);
youtubeRouter.post('/connect', connectUser);

export default youtubeRouter;
