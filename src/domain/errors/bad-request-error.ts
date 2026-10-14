import { AppError } from './app.error';

export class BadRequestError extends AppError {
  constructor(message = 'Requisição mal formada.', details?: unknown) {
    super(message, 400, details);
  }
}
