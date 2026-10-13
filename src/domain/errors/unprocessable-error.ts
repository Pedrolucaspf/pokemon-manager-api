import { AppError } from './app.error';

export class UnprocessableError extends AppError {
  constructor(message = 'Erro semântico.', details?: unknown) {
    super(message, 422, details);
  }
}
