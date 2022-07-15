import { Router } from 'express';
import facebookRouter from './facebook';
import instagramRouter from './instagram';
import twitterRouter from './twitter';
import redditRouter from './reddit';
import youtubeRouter from './youtube';
import yelpRouter from './yelp';

const setupRouter = Router();

setupRouter.use('/facebook', facebookRouter);
setupRouter.use('/instagram', instagramRouter);
setupRouter.use('/twitter', twitterRouter);
setupRouter.use('/reddit', redditRouter);
setupRouter.use('/youtube', youtubeRouter);
setupRouter.use('/yelp', yelpRouter);

export default setupRouter;
