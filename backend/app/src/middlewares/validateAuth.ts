import { RequestHandler } from 'express';
import { unauthorized } from '../controllers/user/userConstants';

const authenticateUser: RequestHandler = async (req, res, next) => {
  if (!req.session.username)
    return res.status(401).json({ message: unauthorized });
  return next();
};

export default authenticateUser;
