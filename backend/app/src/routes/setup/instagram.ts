import { Router } from 'express';
import { getSettings } from '../../controllers/setup/instagram';

const instagramRouter = Router();

instagramRouter.get('/settings', getSettings);

export default instagramRouter;
