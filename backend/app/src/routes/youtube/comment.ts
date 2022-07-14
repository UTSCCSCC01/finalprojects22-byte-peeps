import { Router } from 'express';
import {
  getAllComments,
  getCommentById,
  getComments,
  getCommentsSentimentAnalysis,
  getCommentsSubjectivityAnalysis,
} from '../../controllers/youtube/comment';

const commentRouter = Router();

commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/', getComments);
commentRouter.get('/', getAllComments);
commentRouter.get('/:id', getCommentById);

export default commentRouter;
