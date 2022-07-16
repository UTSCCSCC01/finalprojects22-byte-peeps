import { Router } from 'express';
import { getMedia, getSentimentAnalysisForTimeSeries } from '../../controllers/instagram/media';

const mediaRouter = Router();

mediaRouter.get('/', getMedia);
mediaRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries)

export default mediaRouter;
