import { Router } from 'express';
import {
  getSentimentAnalysisForTimeSeries,
  getTweets,
  getSubjectivityAnalysisForTimeSeries
} from '../../controllers/twitter/tweet';

const tweetRouter = Router();

tweetRouter.get('/', getTweets);
tweetRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);
tweetRouter.get('/subjectivity_analysis', getSubjectivityAnalysisForTimeSeries);

export default tweetRouter;
