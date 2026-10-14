import { AppError } from './app.error';

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Serviço externo indisponível.', details?: unknown) {
    super(message, 503, details);
  }
}
