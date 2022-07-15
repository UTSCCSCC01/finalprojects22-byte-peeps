import { Router } from 'express';
import {
  getComments,
  getCommentsSentimentAnalysis,
  getCommentsSubjectivityAnalysis
} from '../../controllers/youtube/comment';

const commentRouter = Router();

commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/', getComments);

export default commentRouter;
