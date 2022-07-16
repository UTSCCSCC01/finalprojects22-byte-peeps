import { Router } from 'express';
import {
  getListings,
  getSentimentAnalysisForTimeSeries,
} from '../../controllers/reddit/listing';

const listingRouter = Router();

listingRouter.get('/', getListings);
listingRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);

export default listingRouter;
