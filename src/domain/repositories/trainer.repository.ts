import { Trainer } from '@domain/entities/trainer';

export interface ITrainerRepository {
  create(trainer: Trainer): Promise<void>;
  update(trainer: Trainer): Promise<void>;
  delete(email: string): Promise<void>;
  findByEmail(email: string): Promise<Trainer | null>;
  searchByName(name: string): Promise<Trainer[]>;
  findAll(): Promise<Trainer[]>;
}
