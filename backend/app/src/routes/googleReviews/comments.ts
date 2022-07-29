import { Router } from 'express';
import {
  getCommentsSentimentAnalysis,
  getCommentsSubjectivityAnalysis,
} from '../../controllers/googleReviews/comments';

const commentRouter = Router();

commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);

export default commentRouter;