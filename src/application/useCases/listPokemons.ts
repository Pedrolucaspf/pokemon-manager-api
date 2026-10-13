import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

export class ListPokemonsUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(name?: string, type?: string): Promise<Pokemon[]> {
    if (type !== undefined) {
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
