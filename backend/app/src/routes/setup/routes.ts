import { Router } from 'express';
import facebookRouter from './facebook';
import instagramRouter from './instagram';

const setupRouter = Router();

setupRouter.use('/facebook', facebookRouter);
setupRouter.use('/instagram', instagramRouter);

export default setupRouter;