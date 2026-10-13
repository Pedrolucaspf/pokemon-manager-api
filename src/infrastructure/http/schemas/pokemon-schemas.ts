import { z } from 'zod';

const pokeType = [
  'Normal',
  'Grass',
  'Fire',
  'Water',
  'Electric',
  'Ice',
  'Fighting',
  'Ground',
  'Poison',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy',
] as const;

const pokeRarity = ['Common', 'Rare', 'Legendary'] as const;

export const createPokemonSchema = z.object({
  id: z.number().int({ error: 'ID deve ser número inteiro' }),

  name: z
    .string({ error: 'O nome é obrigatório' })
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .trim(),
  type1: z
    .string()
    .refine(
      (val) =>
        pokeType.some((type) => type.toLowerCase() === val.toLowerCase()),
      {
        message: `Tipo inserido inválido`,
      },
    ),
  type2: z
    .string()
    .refine(
      (val) =>
        pokeType.some((type) => type.toLowerCase() === val.toLowerCase()),
      {
        message: `Tipo inserido inválido`,
      },
    )
    .optional(),
  rarity: z
    .string()
    .refine(
      (val) =>
        pokeRarity.some((rarity) => rarity.toLowerCase() === val.toLowerCase()),
      {
        message: `Tipo inserido inválido`,
      },
    ),
  level: z.number().int().min(1).max(100),
  attack: z.number().int().min(1).max(9999),
  defense: z.number().int().min(1).max(9999),
  hp: z.number().int().min(1).max(9999),
  nickname: z.string().nullish(),
  trainerId: z.string().uuid({ error: 'Formato UUID inválido' }).nullish(),
});

export const updatePokemonParamsSchema = z.object({
  id: z.number().int({ error: 'ID deve ser número inteiro' }),
});

export const updatePokemonBodySchema = z
  .object({
    name: z
      .string()
      .min(2, 'O nome deve ter no mínimo 3 caracteres')
      .trim()
      .optional(),
    type1: z
      .string()
      .refine(
        (val) =>
          pokeType.some((type) => type.toLowerCase() === val.toLowerCase()),
        {
          message: `Tipo inserido inválido`,
        },
      )
      .optional(),
    type2: z
      .string()
      .refine(
        (val) =>
          pokeType.some((type) => type.toLowerCase() === val.toLowerCase()),
        {
          message: `Tipo inserido inválido`,
        },
      )
      .optional(),
    rarity: z
      .string()
      .refine(
        (val) =>
          pokeRarity.some(
            (rarity) => rarity.toLowerCase() === val.toLowerCase(),
          ),
        {
          message: `Tipo inserido inválido`,
        },
      )
      .optional(),
    level: z.number().int().min(1).max(100).optional(),
    attack: z.number().int().min(1).max(9999).optional(),
    defense: z.number().int().min(1).max(9999).optional(),
    hp: z.number().int().min(1).max(9999).optional(),
    nickname: z.string().optional(),
    trainerId: z.string().uuid({ error: 'Formato UUID inválido' }).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe pelo menos um campo para atualizar',
  });

export const getPokemonByIdSchema = z.object({
  id: z.number().int({ error: 'ID deve ser número inteiro' }),
});

export const listPokemonsSchema = z.object({
  type: z
    .string()
    .refine(
      (val) =>
        pokeType.some((type) => type.toLowerCase() === val.toLowerCase()),
      {
        message: `Tipo inserido inválido`,
      },
    )
    .optional(),
  search: z.string().optional(),
});

// Inferência automática de tipos TypeScript a partir dos schemas Zod
export type CreateUserDTO = z.infer<typeof createPokemonSchema>;
export type GetPokemonByIdParams = z.infer<typeof getPokemonByIdSchema>;
export type UpdatePokemonParams = z.infer<typeof updatePokemonParamsSchema>;
export type UpdatePokemonBody = z.infer<typeof updatePokemonBodySchema>;
export type listPokemonsParams = z.infer<typeof listPokemonsSchema>;
