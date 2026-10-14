import axios from 'axios';
import {
  PokemonExternalGateway,
  ExternalPokemonDetails,
} from '@domain/gateways/pokemon-external-gateway';
import { ServiceUnavailableError } from '@domain/errors/service-unavailable-error';
import { BadResponseError } from '@domain/errors/bad-response-error';

// DTO Privado: Reflete exatamente a resposta feia/nativa da API externa
interface PokeApiRawResponse {
  sprites: { other: { 'official-artwork': { frontdefault: string | null } } };
  base_experience: number;
  height: number;
  weight: number;
  erro?: boolean;
}

export class PokeApiAxiosGateway implements PokemonExternalGateway {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  async findByName(name: string): Promise<ExternalPokemonDetails | null> {
    try {
      const response = await axios.get<PokeApiRawResponse>(
        `${this.baseUrl}/${encodeURIComponent(name.trim().toLowerCase())}/json/`,
        {
          timeout: 3000, // Timeout estipulado em 3 segundos
        },
      );

      if (response.data.erro) {
        return null;
      }

      // Camada Anti-Corrupção: Traduz os campos para a nomenclatura do nosso Domínio
      return {
        spriteUrl:
          response.data.sprites.other['official-artwork'].frontdefault ?? '',
        base_experience: response.data.base_experience,
        height: response.data.height,
        weight: response.data.weight,
      };
    } catch (error) {
      // Intercepta erros sem quebrar a aplicação
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new ServiceUnavailableError(
            'A PokeApi externa demorou muito para responder',
          );
        } else if (error.code === 'ERR_BAD_RESPONSE') {
          throw new BadResponseError('A PokeApi respondeu de forma inválida.');
        }
      }

      return null;
    }
  }
}
