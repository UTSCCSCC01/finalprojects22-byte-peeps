import { Router } from 'express';
import { getWordCloudData } from '../../controllers/yelp/comment';

const yelpCommentRoutes = Router();

yelpCommentRoutes.get('/wordCloud', getWordCloudData);

export default yelpCommentRoutes;
