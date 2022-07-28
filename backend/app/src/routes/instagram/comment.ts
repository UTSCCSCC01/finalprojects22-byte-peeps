import { Router } from 'express';
import {
  getComments,
  getCommentsSubjectivityAnalysis,
  getCommentsSentimentAnalysis,
  getWordCloudData,
} from '../../controllers/instagram/comment';
import tableFilter from '../../middlewares/tableFilter';

const commentRouter = Router();

commentRouter.get('/', tableFilter, getComments);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
