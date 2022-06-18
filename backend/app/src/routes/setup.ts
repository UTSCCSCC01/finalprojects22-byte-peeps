import { Router } from 'express';
import { facebookConnect, facebookPages } from '../controllers/setup';
import authenticateUser from '../middlewares/validateAuth';

const router = Router();

router.get('/facebook/pages', authenticateUser, facebookPages);
router.post('/facebook/connect', authenticateUser, facebookConnect);

export default router;
