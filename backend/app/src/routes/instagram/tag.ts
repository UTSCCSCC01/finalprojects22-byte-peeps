import { Router } from 'express';
import {
  getTags,
  getTagsSubjectivityAnalysis,
  getTagsSentimentAnalysis,
} from '../../controllers/instagram/tag';

const tagRouter = Router();

tagRouter.get('/', getTags);
tagRouter.get('/subjectivity_analysis', getTagsSubjectivityAnalysis);
tagRouter.get('/sentiment_analysis', getTagsSentimentAnalysis);

export default tagRouter;
