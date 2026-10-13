// src/infrastructure/database/postgres/pg-trainer-repository.ts
import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { postgresPool } from './connection';
import { AppError } from '@domain/errors/app.error';
import { DatabaseError } from 'pg';

export class PgTrainerRepository implements ITrainerRepository {
  async create(trainer: Trainer): Promise<void> {
    const query = `
      INSERT INTO trainers (name, email, city)
      VALUES ($1, $2, $3)
    `;
    try {
      await postgresPool.query(query, [
        trainer.name,
        trainer.email,
        trainer.city,
      ]);
    } catch (error: unknown) {
      if (error instanceof DatabaseError && error.code === '23505') {
        throw new AppError(
          'Já existe um Treinador cadastrado com este e-mail.',
          409,
        );
      }
      throw error;
    }
  }

  async update(trainer: Trainer): Promise<void> {
    const query = `
      UPDATE trainers SET name = $1, city = $3
      WHERE email = $2
    `;
    await postgresPool.query(query, [
      trainer.name,
      trainer.email,
      trainer.city,
    ]);
  }

  async delete(email: string): Promise<void> {
    const query = `DELETE FROM trainers WHERE email = $1`;
    await postgresPool.query(query, [email]);
  }

  async searchByName(name: string): Promise<Trainer[]> {
    const query = `SELECT * FROM trainers WHERE name ILIKE $1`;
    const result = await postgresPool.query(query, [`%${name}%`]);

    return result.rows.map(
      (row) =>
        new Trainer({
          name: row.name,
          email: row.email,
          city: row.city,
        }),
    );
  }

  async findAll(): Promise<Trainer[]> {
    const query = `SELECT * FROM trainers`;
    const result = await postgresPool.query(query);

    return result.rows.map(
      (row) =>
        new Trainer({
          name: row.name,
          email: row.email,
          city: row.city,
        }),
    );
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    const query = `SELECT * FROM trainers WHERE email = $1`;
    const result = await postgresPool.query(query, [email]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new Trainer({
      name: row.name,
      email: row.email,
      city: row.city,
    });
  }
}
