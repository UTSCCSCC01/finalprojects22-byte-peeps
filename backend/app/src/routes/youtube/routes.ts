import { Router } from 'express';
// import youtubeCommentRoutes from './comment';
import youtubeChannelRoutes from './channel';
import youtubeVideoRoutes from './video';
import youtubeCommentRoutes from './comment';

const youtubeRouter = Router();

youtubeRouter.use('/channels', youtubeChannelRoutes);
youtubeRouter.use('/videos', youtubeVideoRoutes);
youtubeRouter.use('/comments', youtubeCommentRoutes);

export default youtubeRouter;
