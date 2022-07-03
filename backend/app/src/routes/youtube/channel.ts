import { Router } from 'express';
import {
  createChannel,
  deleteChannel,
  getAllChannels,
  getChannelById,
} from '../../controllers/youtube/channel';

const channelRouter = Router();

channelRouter.post('/create', createChannel);

channelRouter.get('/', getAllChannels);

channelRouter.get('/:id', getChannelById);

channelRouter.delete('/:id', deleteChannel);

export default channelRouter;
