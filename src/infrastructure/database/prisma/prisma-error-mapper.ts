import { Prisma } from '../../../../generated/prisma/client';
import { AppError } from '@domain/errors/app.error';
import { BadRequestError } from '@domain/errors/bad-request-error';
import { ConflictError } from '@domain/errors/conflict-error';
import { InternalServerError } from '@domain/errors/internal-server-error';
import { NotFoundError } from '@domain/errors/not-found-error';

export class PrismaErrorMapper {
  static toAppError(error: Prisma.PrismaClientKnownRequestError): AppError {
    switch (error.code) {
      case 'P2002': {
        // Violação de constraint Única (Unique constraint)
        const target = (error.meta?.target as string[])?.join(', ') || 'campo';
        return new ConflictError(
          `Já existe um registro cadastrado com este ${target}`,
        );
      }
      case 'P2025': {
        // Registro não encontrado para atualização ou exclusão
        return new NotFoundError('Registro no banco de dados');
      }
      case 'P2003': {
        // Violação de Chave Estrangeira (Foreign key constraint)
        return new BadRequestError(
          'Relacionamento inválido. O recurso associado não existe',
        );
      }
      default:
        // Caso ocorra algum erro do Prisma não mapeado explicitamente
        return new InternalServerError(
          'Erro ao processar operação no banco de dados',
        );
    }
  }
}
