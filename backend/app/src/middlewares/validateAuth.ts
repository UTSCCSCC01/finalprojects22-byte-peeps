import { RequestHandler } from 'express';

export const authenticateUser: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  // TODO: Add authentication mechanism here
}

export default authenticateUser;