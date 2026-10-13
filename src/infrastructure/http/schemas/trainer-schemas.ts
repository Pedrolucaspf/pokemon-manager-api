import { z } from 'zod';

export const createTrainerSchema = z.object({
  name: z
    .string({ error: 'O nome é obrigatório' })
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .trim(),
  email: z
    .string({ error: 'O e-mail é obrigatório' })
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  city: z
    .string({ error: 'Cidade é obrigatória' })
    .min(2, 'O nome da cidade deve ter no mínimo 2 caracteres')
    .trim(),
});

export const updateTrainerParamsSchema = z.object({
  email: z
    .string({ error: 'O e-mail é obrigatório' })
    .email('Formato de e-mail inválido')
    .toLowerCase(),
});

export const updateTrainerBodySchema = z
  .object({
    name: z
      .string({ error: 'O nome é obrigatório' })
      .min(3, 'O nome deve ter no mínimo 3 caracteres')
      .trim(),
    city: z
      .string({ error: 'Cidade é obrigatória' })
      .min(2, 'O nome da cidade deve ter no mínimo 2 caracteres')
      .trim(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe pelo menos um campo para atualizar',
  });

export const getTrainerByEmailSchema = z.object({
  email: z
    .string({ error: 'O e-mail é obrigatório' })
    .email('Formato de e-mail inválido')
    .toLowerCase(),
});

export const listTrainersSchema = z.object({
  search: z.string().optional(),
});

// Inferência automática de tipos TypeScript a partir dos schemas Zod
export type CreateUserDTO = z.infer<typeof createTrainerSchema>;
export type GetTrainerByEmailParams = z.infer<typeof getTrainerByEmailSchema>;
export type UpdateTrainerParams = z.infer<typeof updateTrainerParamsSchema>;
export type UpdateTrainerBody = z.infer<typeof updateTrainerBodySchema>;
export type listTrainersParams = z.infer<typeof listTrainersSchema>;
