import { Router } from 'express';
import {
  getAllVideos,
  getVideoById,
} from '../../controllers/youtube/video';

const videoRouter = Router();

videoRouter.get('/', getAllVideos);
videoRouter.get('/:id', getVideoById);

export default videoRouter;
