import { ErrorRequestHandler } from 'express';
import { object, ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      if (err && err.path) errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'Validation failed', error: errors })
  }

  if (error.message.includes('Unique constraint'))
    return response.status(400).json({ message: `There is already a data registered with the value of the field ${error.meta.target}`, error })

  return response.status(500).json({ message: 'Internal server error', error })
}

export default errorHandler;