import { Router } from 'express';
import { getWordCloudData } from '../../controllers/googleReviews/comment';

const googleReviewsCommentRouter = Router();

googleReviewsCommentRouter.get('/wordCloud', getWordCloudData);

export default googleReviewsCommentRouter;
