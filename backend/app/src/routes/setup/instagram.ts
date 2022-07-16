import { Router } from 'express';
import { connectPage, getSettings } from '../../controllers/setup/instagram';

const instagramRouter = Router();

instagramRouter.get('/settings', getSettings);
instagramRouter.post('/connect', connectPage);

export default instagramRouter;
