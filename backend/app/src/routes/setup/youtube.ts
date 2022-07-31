import { Router } from 'express';
import {
  connectUser,
  getSettings,
  populateFirstTime,
} from '../../controllers/setup/youtube';

const youtubeRouter = Router();

youtubeRouter.get('/settings', getSettings);
youtubeRouter.post('/connect', connectUser);
youtubeRouter.post('/populate', populateFirstTime);

export default youtubeRouter;
