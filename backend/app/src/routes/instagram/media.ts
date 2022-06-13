import { Router } from 'express';
import { getMedia } from '../../controllers/instagram/media';

const mediaRouter = Router();

mediaRouter.get('/', getMedia);

export default mediaRouter;
