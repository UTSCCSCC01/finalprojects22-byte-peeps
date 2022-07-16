import { Router } from 'express';
import {
  getAllVideos,
  getSentimentAnalysisForTimeSeries,
  getVideoById,
} from '../../controllers/youtube/video';

const videoRouter = Router();

videoRouter.get('/', getAllVideos);

videoRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries)

videoRouter.get('/:id', getVideoById);

export default videoRouter;
