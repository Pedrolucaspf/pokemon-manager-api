import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

export class ListPokemonsUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(type?: string): Promise<Pokemon[] | null> {
    if (type) {
      return await this.pokemonRepository.findByType(type);
    }
    return await this.pokemonRepository.findAll();
  }
}
