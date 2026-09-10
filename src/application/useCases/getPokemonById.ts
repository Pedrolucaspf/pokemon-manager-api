import { Pokemon } from '@domain/entities/pokemon';
import { AppError } from '@domain/errors/app.error';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

export class GetPokemonByIdUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<Pokemon | null> {
    const num_id = Number(id);
    const pokemon = await this.pokemonRepository.findById(num_id);
    if (pokemon) {
      return pokemon;
    } else {
      throw new AppError('Pokemon não encontrado no catálogo.', 404);
    }
  }
}
