import { Router } from 'express';
import {
  getListings,
  getListingTable,
  getSentimentAnalysisForTimeSeries,
  getSubjectivityAnalysisForTimeSeries,
} from '../../controllers/reddit/listing';
import tableFilter from '../../middlewares/tableFilter';

const listingRouter = Router();

listingRouter.get('/', getListings);
listingRouter.get('/table', tableFilter, getListingTable);
listingRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);
listingRouter.get(
  '/subjectivity_analysis',
  getSubjectivityAnalysisForTimeSeries
);

export default listingRouter;
