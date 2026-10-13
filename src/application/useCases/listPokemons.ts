import { Pokemon, pokemonType } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { AppError } from '@domain/errors/app.error';

export class ListPokemonsUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(name?: string, type?: string): Promise<Pokemon[]> {
    if (type !== undefined) {
      type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

      if (!Object.values(pokemonType).includes(type as pokemonType)) {
        throw new AppError('Tipo inserido inválido.', 400);
      }

      if (name !== undefined) {
        return await this.pokemonRepository.searchByNameAndType(name, type);
      }
      return await this.pokemonRepository.findByType(type);
    }
    if (name !== undefined) {
      return await this.pokemonRepository.searchByName(name);
    }
    return await this.pokemonRepository.findAll();
  }
}
