import { Router } from 'express';
import {
  getPosts,
  getSentimentAnalysisForTimeSeries, getSubjectivityAnalysisForTimeSeries
} from '../../controllers/facebook/post';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/subjectivity_analysis', getSubjectivityAnalysisForTimeSeries)
postRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);


export default postRouter;
