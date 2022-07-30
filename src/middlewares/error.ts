import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {  
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  return res.status(500).json({ message: err.message });
};

export default errorHandler;
