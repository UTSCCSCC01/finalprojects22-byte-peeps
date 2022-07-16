import { Router } from 'express';

import { signIn, signOut, signUp } from '../../controllers/user/user';
import authenticateUser from '../../middlewares/validateAuth';

const userRoutes = Router();

userRoutes.post('/signin', signIn);
userRoutes.post('/signout', authenticateUser, signOut);
userRoutes.post('/signup', signUp);

export default userRoutes;
