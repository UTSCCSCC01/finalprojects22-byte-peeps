import { Router } from 'express';
import {
  getSentimentAnalysisForTimeSeries,
  getTweets,
} from '../../controllers/twitter/tweet';

const tweetRouter = Router();

tweetRouter.get('/', getTweets);
tweetRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);

export default tweetRouter;
