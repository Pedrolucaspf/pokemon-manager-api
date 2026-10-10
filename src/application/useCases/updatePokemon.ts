import { Pokemon, pokemonType, Rarity } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { AppError } from '@domain/errors/app.error';

export class UpdatePokemonUseCase {
  constructor(private PokemonRepository: IPokemonRepository) {}

  async execute(
    id: string,
    name?: string,
    type?: string,
    rarity?: string,
    attack?: string,
    defense?: string,
    hp?: string,
    nickname?: string,
  ): Promise<Pokemon> {
    const num_id = Number(id);
    const pokemon = await this.PokemonRepository.findById(num_id);

    if (!pokemon) {
      throw new AppError('Pokemon não encontrado no catálogo.', 404);
    }

    let enum_type;
    let enum_rarity;
    let num_attack;
    let num_defense;
    let num_hp;

    if (!name && !type && !rarity && !attack && !defense && !hp) {
      throw new AppError(
        'Atualização vazia: novo name/type/rarity/attack/defense/hp deve ser inserido.',
        4000,
      );
    } else {
      if (!name) {
        name = pokemon.name;
      }

      if (!type) {
        enum_type = pokemon.type;
      } else {
        if (!Object.values(pokemonType).includes(type as pokemonType)) {
          throw new AppError('Tipo inserido inválido.', 400);
        }

        enum_type = type as pokemonType;
      }

      if (!rarity) {
        enum_rarity = pokemon.rarity;
      } else {
        if (!Object.values(Rarity).includes(rarity as Rarity)) {
          throw new AppError('Raridade inserida inválida.', 400);
        }
        enum_rarity = rarity as Rarity;
      }

      if (!attack) {
        num_attack = pokemon.attack;
      } else {
        num_attack = Number(attack);
        if (isNaN(num_attack)) {
          throw new AppError('Valor de ataque deve ser numérico.', 400);
        }
      }

      if (!defense) {
        num_defense = pokemon.defense;
      } else {
        num_defense = Number(defense);
        if (isNaN(num_defense)) {
          throw new AppError('Valor de defesa deve ser numérico.', 400);
        }
      }

      if (!hp) {
        num_hp = pokemon.hp;
      } else {
        num_hp = Number(hp);
        if (isNaN(num_hp)) {
          throw new AppError('Valor de HP deve ser numérico.', 400);
        }
      }

      if (!nickname) {
        nickname = pokemon.nickname;
      }
    }

    const newPokemon = new Pokemon({
      id: num_id,
      name: name,
      type: enum_type,
      rarity: enum_rarity,
      stats: {
        attack: Number(num_attack),
        defense: Number(num_defense),
        hp: Number(num_hp),
      },
      nickname: nickname,
    });

    await this.PokemonRepository.update(newPokemon);
    return newPokemon;
  }
}
