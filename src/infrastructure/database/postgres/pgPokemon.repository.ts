// src/infrastructure/database/postgres/pg-pokemon-repository.ts
import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { postgresPool } from './connection';

export class PgPokemonRepository implements IPokemonRepository {
  async create(pokemon: Pokemon): Promise<void> {
    const query = `
      INSERT INTO pokemons (id, name, type1, type2, rarity, level, attack, defense, hp, nickname)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    await postgresPool.query(query, [
      pokemon.id,
      pokemon.name,
      pokemon.type1,
      pokemon.type2,
      pokemon.rarity,
      pokemon.level,
      pokemon.attack,
      pokemon.defense,
      pokemon.hp,
      pokemon.nickname,
    ]);
  }

  async update(pokemon: Pokemon): Promise<void> {
    const query = `
      UPDATE pokemons SET name = $2, type1 = $3, type2 = $4, rarity = $5, level = $6, attack = $7, defense = $8, hp = $9, nickname = $10
      WHERE id = $1
    `;
    await postgresPool.query(query, [
      pokemon.id,
      pokemon.name,
      pokemon.type1,
      pokemon.type2,
      pokemon.rarity,
      pokemon.level,
      pokemon.attack,
      pokemon.defense,
      pokemon.hp,
      pokemon.nickname,
    ]);
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM pokemons WHERE id = $1`;
    await postgresPool.query(query, [id]);
  }

  async findByType(type: string): Promise<Pokemon[]> {
    const query = `SELECT * FROM pokemons WHERE type1 = $1 OR type2 = $1`;
    const result = await postgresPool.query(query, [type]);

    return result.rows.map(
      (row) =>
        new Pokemon({
          id: row.id,
          name: row.name,
          type1: row.type1,
          type2: row.type2,
          rarity: row.rarity,
          level: row.rarity,
          stats: {
            attack: row.attack,
            defense: row.defense,
            hp: row.hp,
          },
          nickname: row.nickname,
        }),
    );
  }

  async findAll(): Promise<Pokemon[]> {
    const query = `SELECT * FROM pokemons`;
    const result = await postgresPool.query(query);

    return result.rows.map(
      (row) =>
        new Pokemon({
          id: row.id,
          name: row.name,
          type1: row.type1,
          type2: row.type2,
          rarity: row.rarity,
          level: row.rarity,
          stats: {
            attack: row.attack,
            defense: row.defense,
            hp: row.hp,
          },
          nickname: row.nickname,
        }),
    );
  }

  async findById(id: number): Promise<Pokemon | null> {
    const query = `SELECT * FROM pokemons WHERE id = $1`;
    const result = await postgresPool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new Pokemon({
      id: row.id,
      name: row.name,
      type1: row.type1,
      type2: row.type2,
      rarity: row.rarity,
      level: row.rarity,
      stats: {
        attack: row.attack,
        defense: row.defense,
        hp: row.hp,
      },
      nickname: row.nickname,
    });
  }

  async searchByName(name: string): Promise<Pokemon[]> {
    const query = `SELECT * FROM pokemons WHERE name ILIKE $1`;
    const result = await postgresPool.query(query, [`%${name}%`]);

    return result.rows.map(
      (row) =>
        new Pokemon({
          id: row.id,
          name: row.name,
          type1: row.type1,
          type2: row.type2,
          rarity: row.rarity,
          level: row.rarity,
          stats: {
            attack: row.attack,
            defense: row.defense,
            hp: row.hp,
          },
          nickname: row.nickname,
        }),
    );
  }

  async searchByNameAndType(name: string, type: string): Promise<Pokemon[]> {
    const query = `SELECT * FROM pokemons WHERE name ILIKE $1 AND (type1 = $2 OR type2 = $2)`;
    const result = await postgresPool.query(query, [`%${name}%`, type]);

    return result.rows.map(
      (row) =>
        new Pokemon({
          id: row.id,
          name: row.name,
          type1: row.type1,
          type2: row.type2,
          rarity: row.rarity,
          level: row.rarity,
          stats: {
            attack: row.attack,
            defense: row.defense,
            hp: row.hp,
          },
          nickname: row.nickname,
        }),
    );
  }
}
