import { RequestHandler } from 'express';

export const authenticateUser: RequestHandler = async (req, res, next) => {

  if (!req.session.username) return res.status(401).end("access denied");
  return next();
}

export default authenticateUser;