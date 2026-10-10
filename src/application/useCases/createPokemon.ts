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
    const id = Number(data.id);
    const PokemonAlreadyExists = await this.PokemonRepository.findById(id);

    if (PokemonAlreadyExists) {
      throw new AppError('Pokemon com este id já está cadastrado.', 400);
    }

    if (!Object.values(pokemonType).includes(data.type as pokemonType)) {
      throw new AppError('Tipo inserido inválido.', 400);
    }

    const enum_type = data.type as pokemonType;

    if (!Object.values(Rarity).includes(data.rarity as Rarity)) {
      throw new AppError('Raridade inserida inválida.', 400);
    }

    const enum_rarity = data.rarity as Rarity;

    const num_attack = Number(data.attack);
    if (isNaN(num_attack)) {
      throw new AppError('Valor de ataque deve ser numérico.', 400);
    }

    const num_defense = Number(data.defense);
    if (isNaN(num_defense)) {
      throw new AppError('Valor de defesa deve ser numérico.', 400);
    }

    const num_hp = Number(data.hp);
    if (isNaN(num_hp)) {
      throw new AppError('Valor de HP deve ser numérico.', 400);
    }

    let newPokemon: Pokemon;

    if (data.nickname) {
      newPokemon = new Pokemon({
        id: id,
        name: data.name,
        type: enum_type,
        rarity: enum_rarity,
        stats: {
          attack: num_attack,
          defense: num_defense,
          hp: num_hp,
        },
        nickname: data.nickname,
      });
    } else {
      newPokemon = new Pokemon({
        id: id,
        name: data.name,
        type: enum_type,
        rarity: enum_rarity,
        stats: {
          attack: num_attack,
          defense: num_defense,
          hp: num_hp,
        },
      });
    }

    await this.PokemonRepository.create(newPokemon);
    return newPokemon;
  }
}
