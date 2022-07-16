import { Router } from 'express';
import {
  getComments,
  getCommentsByPostId,
  getCommentsSubjectivityAnalysis,
  getCommentsSentimentAnalysis,
  getWordCloudData,
} from '../../controllers/facebook/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/wordCloud', getWordCloudData);
commentRouter.get('/:postId', getCommentsByPostId);

export default commentRouter;
