import { Router } from 'express';
import { facebookConnect, getFacebookCurrentPage, getFacebookPages } from '../../controllers/setup';

const facebookRouter = Router();

facebookRouter.get('/pages', getFacebookPages);
facebookRouter.get('/page', getFacebookCurrentPage);
facebookRouter.post('/connect', facebookConnect);

export default facebookRouter;
