import { AppError } from './app.error';

export class InternalServerError extends AppError {
  constructor(message = 'Erro interno do servidor.', details?: unknown) {
    super(message, 500, details);
  }
}
