import { Router } from 'express';
import {
  getComments,
  getCommentsSentimentAnalysis,
  getCommentsSubjectivityAnalysis,
  getWordCloudData,
} from '../../controllers/twitter/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
