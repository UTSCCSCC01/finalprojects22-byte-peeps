import { Router } from 'express';
import {
  getComments,
  getCommentsSubjectivityAnalysis,
  getCommentsSentimentAnalysis,
  getWordCloudData,
} from '../../controllers/facebook/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
