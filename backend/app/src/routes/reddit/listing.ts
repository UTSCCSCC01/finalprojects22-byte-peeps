import { Router } from 'express';
import {
  getListings,
  getSentimentAnalysisForTimeSeries, getSubjectivityAnalysisForTimeSeries
} from '../../controllers/reddit/listing';

const listingRouter = Router();

listingRouter.get('/', getListings);
listingRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);
listingRouter.get('/subjectivity_analysis', getSubjectivityAnalysisForTimeSeries);

export default listingRouter;
