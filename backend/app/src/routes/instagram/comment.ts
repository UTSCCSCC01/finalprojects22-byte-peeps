import { Router } from 'express';
import {
  getComments,
  getCommentsSubjectivityAnalysis,
  getCommentsSentimentAnalysis,
} from '../../controllers/instagram/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);

export default commentRouter;
