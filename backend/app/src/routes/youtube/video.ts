import { Router } from 'express';
import {
  getVideos,
  getSentimentAnalysisForTimeSeries,
  getVideoById,
} from '../../controllers/youtube/video';

const videoRouter = Router();

videoRouter.get('/', getVideos);

videoRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries);

videoRouter.get('/:id', getVideoById);

export default videoRouter;
