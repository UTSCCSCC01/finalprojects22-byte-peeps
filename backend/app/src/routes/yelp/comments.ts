import { Router } from 'express';
import {
  getCommentsSentimentAnalysis,
  getCommentsSubjectivityAnalysis,
} from '../../controllers/yelp/comments';
import { getWordCloudData } from '../../controllers/yelp/comments';

const commentRouter = Router();

commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
