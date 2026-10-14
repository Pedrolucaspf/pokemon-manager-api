import { NotFoundError } from '@domain/errors/not-found-error';
import {
  ExternalPokemonDetails,
  PokemonExternalGateway,
} from '@domain/gateways/pokemon-external-gateway';

export class SearchPokeApiUseCase {
  constructor(private readonly pokeExternalGateway: PokemonExternalGateway) {}

  async execute(search: string): Promise<ExternalPokemonDetails> {
    const dataInExternalApi = await this.pokeExternalGateway.findByName(search);

    if (!dataInExternalApi) {
      throw new NotFoundError('Pokemon com este nome');
    }

    return dataInExternalApi;
  }
}
