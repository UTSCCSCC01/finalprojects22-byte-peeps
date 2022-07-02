import { NextFunction, Request, Response } from 'express';
import { unknownError } from '../globalHelpers/globalConstants';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ message: unknownError });
};

export default errorHandler;
