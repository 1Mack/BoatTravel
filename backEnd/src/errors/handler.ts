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

    return response.json({ message: 'Validation failed', error: errors }).status(404)
  }

  if (error.message.includes('Unique constraint'))
    return response.json({ message: `There is already a data registered with the value of the field ${error.meta.target}`, error }).status(400)

  return response.json({ message: 'Internal server error', error }).status(500)
}

export default errorHandler;