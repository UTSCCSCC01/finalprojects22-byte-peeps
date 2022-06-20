import { Router } from 'express';
import { facebookConnect, getFacebookCurrentPage, getFacebookPages } from '../controllers/setup';
import authenticateUser from '../middlewares/validateAuth';

const router = Router();

router.get('/facebook/pages', authenticateUser, getFacebookPages);
router.get('/facebook/page', authenticateUser, getFacebookCurrentPage);
router.post('/facebook/connect', authenticateUser, facebookConnect);

export default router;
