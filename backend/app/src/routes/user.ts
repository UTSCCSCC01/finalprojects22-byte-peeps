import { Router } from 'express';

import { register as registrationHander, login as loginhandler, logout as logouthandler } from '../controllers/users';

const router = Router();

router.post('/register/', ((req, res, next) => registrationHander(req, res, next)))
router.post('/login/', ((req, res, next) => loginhandler(req, res, next)));
router.get('/logout/', ((req, res, next) => logouthandler(req, res, next)));


export default router;