import { Pokemon, pokemonType, Rarity } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { AppError } from '@domain/errors/app.error';

interface CreatePokemonDTO {
  id: string;
  name: string;
  type: string;
  rarity: string;
  attack: string;
  defense: string;
  hp: string;
  nickname?: string;
}

export class CreatePokemonUseCase {
  constructor(private PokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const num_id = Number(data.id);
    const PokemonAlreadyExists = await this.PokemonRepository.findById(num_id);

    if (PokemonAlreadyExists) {
      throw new AppError('Pokemon com este id já está cadastrado.', 400);
    }

    const enum_type = data.type as pokemonType;
    const enum_rarity = data.rarity as Rarity;

    let newPokemon: Pokemon;

    if (data.nickname) {
      newPokemon = new Pokemon({
        id: num_id,
        name: data.name,
        type: enum_type,
        rarity: enum_rarity,
        stats: {
          attack: Number(data.attack),
          defense: Number(data.defense),
          hp: Number(data.hp),
        },
        nickname: data.nickname,
      });
    } else {
      newPokemon = new Pokemon({
        id: num_id,
        name: data.name,
        type: enum_type,
        rarity: enum_rarity,
        stats: {
          attack: Number(data.attack),
          defense: Number(data.defense),
          hp: Number(data.hp),
        },
      });
    }

    await this.PokemonRepository.create(newPokemon);
    return newPokemon;
  }
}
