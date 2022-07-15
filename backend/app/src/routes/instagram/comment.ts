import { Router } from 'express';
import {
  getComments,
  getCommentsByMediaId,
  getCommentsSubjectivityAnalysis,
  getCommentsSentimentAnalysis,
  getWordCloudData,
} from '../../controllers/instagram/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/:mediaId', getCommentsByMediaId);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
