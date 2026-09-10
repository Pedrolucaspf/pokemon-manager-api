import { Pokemon } from '@domain/entities/pokemon';

export interface IPokemonRepository {
  create(pokemon: Pokemon): Promise<void>;
  update(pokemon: Pokemon): Promise<void>;
  delete(id: number): Promise<void>;
  findByType(type: string): Promise<Pokemon[] | null>;
  findById(id: number): Promise<Pokemon | null>;
  findAll(): Promise<Pokemon[]>;
}
