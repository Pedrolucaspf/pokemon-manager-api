import { AppError } from './app.error';

export class BadResponseError extends AppError {
  constructor(
    message = 'Resposta inválida do serviço externo.',
    details?: unknown,
  ) {
    super(message, 502, details);
  }
}
