import { Router } from 'express';
import { getStats } from '../../controllers/facebook/stats';

const statsRouter = Router();

statsRouter.get('/', getStats);

export default statsRouter;
