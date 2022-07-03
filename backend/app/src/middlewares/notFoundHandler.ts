import { RequestHandler } from 'express';
import { resourceNotFound } from '../globalHelpers/globalConstants';

const notFoundHandler: RequestHandler = (req, res, next) => {
  res.status(404).json({ message: resourceNotFound });
};

export default notFoundHandler;
