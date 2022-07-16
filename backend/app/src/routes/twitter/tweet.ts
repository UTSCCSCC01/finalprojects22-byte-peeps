import { Router } from 'express';
import { getSentimentAnalysisForTimeSeries } from '../../controllers/twitter/tweet';

const tweetRouter = Router();

tweetRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries)

export default tweetRouter;