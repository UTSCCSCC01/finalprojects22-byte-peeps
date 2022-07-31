import { Router } from 'express';
import {
  getComments,
  getCommentsSentimentAnalysis,
  getCommentsSubjectivityAnalysis,
  getWordCloudData,
} from '../../controllers/twitter/comment';
import tableFilter from '../../middlewares/tableFilter';

const commentRouter = Router();

commentRouter.get('/', tableFilter, getComments);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
