import { Router } from 'express';
import userRoutes from './user/user';
import instagramRoutes from './instagram/routes';
import facebookRoutes from './facebook/routes';
import setupRoutes from './setup/routes';
import authenticateUser from '../middlewares/validateAuth';

const requestRouter = Router();

/* User Routes */
requestRouter.use('/user', userRoutes);

/* Social Media Routing */
requestRouter.use('/instagram', authenticateUser, instagramRoutes);
requestRouter.use('/facebook', authenticateUser, facebookRoutes);

/* Setup Routing */
requestRouter.use('/setup', authenticateUser, setupRoutes);

export default requestRouter;
