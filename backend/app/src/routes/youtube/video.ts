import { Router } from 'express';
import {
  getVideos,
  getSentimentAnalysisForTimeSeries,
  getVideoById,
  getSubjectivityAnalysisForTimeSeries
} from '../../controllers/youtube/video';

const videoRouter = Router();

videoRouter.get('/', getVideos);

videoRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);
videoRouter.get('/subjectivity_analysis', getSubjectivityAnalysisForTimeSeries);
videoRouter.get('/:id', getVideoById);

export default videoRouter;
