import { Router } from 'express';
import facebookRouter from './facebook';
import instagramRouter from './instagram';
import twitterRouter from './twitter';

const setupRouter = Router();

setupRouter.use('/facebook', facebookRouter);
setupRouter.use('/instagram', instagramRouter);
setupRouter.use('/twitter', twitterRouter);

export default setupRouter;