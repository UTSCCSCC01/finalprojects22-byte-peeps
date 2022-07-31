import { Router } from 'express';
import {
  getCommentsAndTags,
  getCommentsSubjectivityAnalysis,
  getCommentsSentimentAnalysis,
  getWordCloudData,
} from '../../controllers/instagram/comment';
import tableFilter from '../../middlewares/tableFilter';

const commentRouter = Router();

commentRouter.get('/', tableFilter, getCommentsAndTags);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
