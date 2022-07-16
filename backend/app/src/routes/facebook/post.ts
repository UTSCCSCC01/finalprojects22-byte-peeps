import { Router } from 'express';
import {
  getPosts,
  getSentimentAnalysisForTimeSeries,
} from '../../controllers/facebook/post';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);

export default postRouter;
