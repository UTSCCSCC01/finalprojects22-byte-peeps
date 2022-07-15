import { Router } from 'express';
import {
  getComments,
  getCommentsByPostId,
  getCommentsSubjectivityAnalysis,
  getCommentsSentimentAnalysis,
} from '../../controllers/facebook/comment';
import { getWordCloudData } from '../../controllers/instagram/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/:postId', getCommentsByPostId);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
