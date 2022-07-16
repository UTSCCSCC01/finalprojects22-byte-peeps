import { Router } from 'express';
import {
  getComments,
  getCommentsSentimentAnalysis,
  getCommentsSubjectivityAnalysis,
  getWordCloudData,
} from '../../controllers/youtube/comment';

const commentRouter = Router();

commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/', getComments);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
