import { AppError } from './app.error';

export class NotFoundError extends AppError {
  constructor(entityName: string, details?: unknown) {
    super(`${entityName} não encontrado(a)`, 404, details);
  }
}
