import { Router } from 'express';
import { getSentimentAnalysisForTimeSeries } from '../../controllers/reddit/listing';

const listingRouter = Router();

listingRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries)

export default listingRouter;