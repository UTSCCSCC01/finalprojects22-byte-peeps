import { Router } from 'express';
import facebookRouter from './facebook';

const setupRouter = Router();

setupRouter.use('/facebook', facebookRouter);

export default setupRouter;