import { Router } from 'express';
import {
  getListings,
  getListingTable,
  getSentimentAnalysisForTimeSeries,
} from '../../controllers/reddit/listing';

const listingRouter = Router();

listingRouter.get('/', getListings);
listingRouter.get('/table', getListingTable);
listingRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);

export default listingRouter;
