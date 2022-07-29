import { Router } from 'express';
import { getWordCloudData } from '../../controllers/googleReviews/comments';

const googleReviewsCommentRouter = Router();

googleReviewsCommentRouter.get('/wordCloud', getWordCloudData);

export default googleReviewsCommentRouter;
