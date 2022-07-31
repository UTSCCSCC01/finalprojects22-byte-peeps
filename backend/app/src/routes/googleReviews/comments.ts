import { Router } from 'express';
import {
  getCommentsSentimentAnalysis,
  getCommentsSubjectivityAnalysis,
  getComments,
} from '../../controllers/googleReviews/comments';
import { getWordCloudData } from '../../controllers/googleReviews/comments';
import tableFilter from '../../middlewares/tableFilter';

const commentRouter = Router();

commentRouter.get('/', tableFilter, getComments);
commentRouter.get('/sentiment_analysis', getCommentsSentimentAnalysis);
commentRouter.get('/subjectivity_analysis', getCommentsSubjectivityAnalysis);
commentRouter.get('/wordCloud', getWordCloudData);

export default commentRouter;
