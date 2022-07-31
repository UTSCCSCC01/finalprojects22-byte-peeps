import { Router } from 'express';
import userRoutes from './user/user';
import instagramRoutes from './instagram/routes';
import facebookRoutes from './facebook/routes';
import youtubeRoutes from './youtube/routes';
import twitterRoutes from './twitter/routes';
import redditRoutes from './reddit/routes';
import setupRoutes from './setup/routes';
import authenticateUser from '../middlewares/validateAuth';
import googleReviewsRouter from './googleReviews/routes';
import yelpRouter from './yelp/routes';
import overviewRouter from './overview/routes';

const requestRouter = Router();

/* User Routes */
requestRouter.use('/user', userRoutes);

/* Review Apps Routing */
requestRouter.use('/yelp', authenticateUser, yelpRouter);
requestRouter.use('/googleReviews', authenticateUser, googleReviewsRouter);

/* Social Media Routing */
requestRouter.use('/instagram', authenticateUser, instagramRoutes);
requestRouter.use('/facebook', authenticateUser, facebookRoutes);
requestRouter.use('/twitter', authenticateUser, twitterRoutes);
requestRouter.use('/youtube', authenticateUser, youtubeRoutes);
requestRouter.use('/reddit', authenticateUser, redditRoutes);

/* Overview Route */
requestRouter.use('/overview', authenticateUser, overviewRouter); //todo controller

/* Setup Routing */
requestRouter.use('/setup', authenticateUser, setupRoutes);

export default requestRouter;
