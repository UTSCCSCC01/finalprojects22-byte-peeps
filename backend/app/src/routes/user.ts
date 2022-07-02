import { Router } from 'express';

import { signIn, signOut, signUp } from '../controllers/user/user';
import authenticateUser from '../middlewares/validateAuth';

const router = Router();

router.post('/signin', (req, res, next) => signIn(req, res, next));
router.post('/signout', authenticateUser, (req, res, next) =>
  signOut(req, res, next)
);
router.post('/signup', (req, res, next) => signUp(req, res, next));

export default router;
