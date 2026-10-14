import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { BadRequestError } from '@domain/errors/bad-request-error';

interface RequestValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export const validateRequest = (schemas: RequestValidationSchemas) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      req.validated = {
        ...(schemas.body && {
          body: await schemas.body.parseAsync(req.body),
        }),
        ...(schemas.query && {
          query: await schemas.query.parseAsync(req.query),
        }),
        ...(schemas.params && {
          params: await schemas.params.parseAsync(req.params),
        }),
      };

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issueDetails = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return next(
          new BadRequestError('Dados de entrada inválidos', issueDetails),
        );
      }

      next(error);
    }
  };
};
