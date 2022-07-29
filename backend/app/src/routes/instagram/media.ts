import { Router } from 'express';
import { getMedia, getSentimentAnalysisForTimeSeries, getSubjectivityAnalysisForTimeSeries } from '../../controllers/instagram/media';

const mediaRouter = Router();

mediaRouter.get('/', getMedia);
mediaRouter.get('/sentiment_analysis', getSentimentAnalysisForTimeSeries)
mediaRouter.get('/subjectivty_analysis', getSubjectivityAnalysisForTimeSeries);

export default mediaRouter;
