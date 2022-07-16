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
commentRouter.get('/wordCloud', getWordCloudData);
commentRouter.get('/:mediaId', getCommentsByMediaId);

export default commentRouter;
