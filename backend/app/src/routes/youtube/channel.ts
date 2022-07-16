import { Router } from 'express';
import {
  getAllChannels,
  getChannelById,
} from '../../controllers/youtube/channel';

const channelRouter = Router();

channelRouter.get('/', getAllChannels);
channelRouter.get('/:id', getChannelById);

export default channelRouter;
