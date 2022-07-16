import { Router } from 'express';
import instagramMediaRoutes from './media';
import instagramCommentRoutes from './comment';
import instagramTagRoutes from './tag';
import instagramStatsRoutes from './stats';

const instagramRouter = Router();

instagramRouter.use('/media', instagramMediaRoutes);
instagramRouter.use('/comments', instagramCommentRoutes);
instagramRouter.use('/tags', instagramTagRoutes);
instagramRouter.use('/stats', instagramStatsRoutes);

export default instagramRouter;
