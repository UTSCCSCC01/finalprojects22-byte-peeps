import { Router } from 'express';

import { signIn, signOut, signUp } from '../../controllers/user/user';
import authenticateUser from '../../middlewares/validateAuth';

const userRoutes = Router();

userRoutes.post('/signin', (req, res, next) => signIn(req, res, next));
userRoutes.post('/signout', authenticateUser, (req, res, next) =>
  signOut(req, res, next)
);
userRoutes.post('/signup', (req, res, next) => signUp(req, res, next));

export default userRoutes;
