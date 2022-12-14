import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import errorCatalog, { ErrorTypes } from '../error/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {  
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  const msgAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[msgAsErrorType];
  if (mappedError) {
    const { message, status } = mappedError;

    return res.status(status).json({ error: message });
  }

  return res.status(500).json({ message: err.message });
};

export default errorHandler;
