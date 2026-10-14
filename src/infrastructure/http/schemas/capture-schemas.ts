import { z } from 'zod';

export const createCaptureSchema = z.object({
  trainerId: z.string().uuid({ error: 'Formato UUID inválido' }),
  pokemonName: z
    .string({ error: 'O nome é obrigatório' })
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .trim(),
});

export const listCapturesSchema = z.object({
  search: z.string().uuid({ error: 'Formato UUID inválido' }).optional(),
});

// Inferência automática de tipos TypeScript a partir dos schemas Zod
export type CreateCaptureDTO = z.infer<typeof createCaptureSchema>;
export type listCaptureParams = z.infer<typeof listCapturesSchema>;
