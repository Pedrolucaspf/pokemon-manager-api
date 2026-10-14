import { Pokemon, pokemonType, Rarity } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { Pokemon as PrismaPokemon } from '../../../../generated/prisma/client';
import { prisma } from './client';

export class PrismaPokemonRepository implements IPokemonRepository {
  async create(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.create({
      data: {
        id: pokemon.id,
        name: pokemon.name,
        type1: pokemon.type1,
        type2: pokemon.type2,
        rarity: pokemon.rarity,
        level: pokemon.level,
        attack: pokemon.attack,
        defense: pokemon.defense,
        hp: pokemon.hp,
        nickname: pokemon.nickname,
        trainerId: pokemon.trainerId,
      },
    });
  }

  async update(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.update({
      where: { id: pokemon.id },
      data: {
        name: pokemon.name,
        type1: pokemon.type1,
        type2: pokemon.type2,
        rarity: pokemon.rarity,
        level: pokemon.level,
        attack: pokemon.attack,
        defense: pokemon.defense,
        hp: pokemon.hp,
        nickname: pokemon.nickname,
        trainerId: pokemon.trainerId,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.pokemon.delete({
      where: {
        id: id,
      },
    });
  }

  async findByType(type: string): Promise<Pokemon[]> {
    const enum_type = type as pokemonType;
    const pokemonsRaw = await prisma.pokemon.findMany({
      where: { OR: [{ type1: enum_type }, { type2: enum_type }] },
    });

    return pokemonsRaw.map(
      (row: PrismaPokemon) =>
        new Pokemon({
          id: row.id,
          name: row.name,
          type1: row.type1 as unknown as pokemonType,
          type2: row.type2 as unknown as pokemonType,
          rarity: row.rarity as unknown as Rarity,
          level: row.level,
          stats: {
            attack: row.attack,
            defense: row.defense,
            hp: row.hp,
          },
          nickname: row.nickname ?? undefined,
          trainerId: row.trainerId ?? undefined,
        }),
    );
  }

  async findAll(): Promise<Pokemon[]> {
    const pokemonsRaw = await prisma.pokemon.findMany();

    return pokemonsRaw.map(
      (row: PrismaPokemon) =>
        new Pokemon({
          id: row.id,
          name: row.name,
          type1: row.type1 as unknown as pokemonType,
          type2: row.type2 as unknown as pokemonType,
          rarity: row.rarity as unknown as Rarity,
          level: row.level,
          stats: {
            attack: row.attack,
            defense: row.defense,
            hp: row.hp,
          },
          nickname: row.nickname ?? undefined,
          trainerId: row.trainerId ?? undefined,
        }),
    );
  }

  async findById(id: number): Promise<Pokemon | null> {
    const row = await prisma.pokemon.findUnique({
      where: { id: id },
    });

    if (!row) {
      return null;
    }

    return new Pokemon({
      id: row.id,
      name: row.name,
      type1: row.type1 as unknown as pokemonType,
      type2: row.type2 as unknown as pokemonType,
      rarity: row.rarity as unknown as Rarity,
      level: row.level,
      stats: {
        attack: row.attack,
        defense: row.defense,
        hp: row.hp,
      },
      nickname: row.nickname ?? undefined,
      trainerId: row.trainerId ?? undefined,
    });
  }

  async searchByName(name: string): Promise<Pokemon[]> {
    const pokemonsRaw = await prisma.pokemon.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return pokemonsRaw.map(
      (row: PrismaPokemon) =>
        new Pokemon({
          id: row.id,
          name: row.name,
          type1: row.type1 as unknown as pokemonType,
          type2: row.type2 as unknown as pokemonType,
          rarity: row.rarity as unknown as Rarity,
          level: row.level,
          stats: {
            attack: row.attack,
            defense: row.defense,
            hp: row.hp,
          },
          nickname: row.nickname ?? undefined,
          trainerId: row.trainerId ?? undefined,
        }),
    );
  }

  async searchByNameAndType(name: string, type: string): Promise<Pokemon[]> {
    const enum_type = type as pokemonType;
    const pokemonsRaw = await prisma.pokemon.findMany({
      where: {
        AND: [
          { OR: [{ type1: enum_type }, { type2: enum_type }] },
          {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return pokemonsRaw.map(
      (row: PrismaPokemon) =>
        new Pokemon({
          id: row.id,
          name: row.name,
          type1: row.type1 as unknown as pokemonType,
          type2: row.type2 as unknown as pokemonType,
          rarity: row.rarity as unknown as Rarity,
          level: row.level,
          stats: {
            attack: row.attack,
            defense: row.defense,
            hp: row.hp,
          },
          nickname: row.nickname ?? undefined,
          trainerId: row.trainerId ?? undefined,
        }),
    );
  }

  async countPokemonsByTrainer(trainerId: string): Promise<number> {
    const numPokemons: number = await prisma.pokemon.count({
      where: {
        trainerId: trainerId,
      },
    });
    return numPokemons;
  }
}
