import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { AppError } from '@domain/errors/app.error';

export class DeletePokemonUseCase {
  constructor(private PokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<Pokemon> {
    const num_id = Number(id);
    const pokemon = await this.PokemonRepository.findById(num_id);

    if (!pokemon) {
      throw new AppError('Pokemon não encontrado no catálogo.', 404);
    }

    await this.PokemonRepository.delete(num_id);
    return pokemon;
  }
}
