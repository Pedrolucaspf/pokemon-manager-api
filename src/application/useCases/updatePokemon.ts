import { Pokemon, pokemonType, Rarity } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { NotFoundError } from '@domain/errors/not-found-error';
import { BadRequestError } from '@domain/errors/bad-request-error';
import { UnprocessableError } from '@domain/errors/unprocessable-error';

export class UpdatePokemonUseCase {
  constructor(
    private PokemonRepository: IPokemonRepository,
    private TrainerRepository: ITrainerRepository,
  ) {}

  async execute(
    id: string,
    name?: string,
    type1?: string,
    type2?: string,
    rarity?: string,
    level?: string,
    attack?: string,
    defense?: string,
    hp?: string,
    nickname?: string,
    trainerId?: string,
  ): Promise<Pokemon> {
    const num_id = Number(id);
    const pokemon = await this.PokemonRepository.findById(num_id);

    if (!pokemon) {
      throw new NotFoundError('Pokemon');
    }

    let enum_type1;
    let enum_type2;
    let enum_rarity;
    let num_level;
    let num_attack;
    let num_defense;
    let num_hp;

    if (
      !name &&
      !type1 &&
      !type2 &&
      !rarity &&
      !level &&
      !attack &&
      !defense &&
      !hp &&
      !nickname &&
      !trainerId
    ) {
      throw new BadRequestError(
        'Atualização vazia, algum atributo precisa ser atualizado.',
      );
    } else {
      if (!name) {
        name = pokemon.name;
      }

      if (!type1) {
        enum_type1 = pokemon.type1;
      } else {
        if (!Object.values(pokemonType).includes(type1 as pokemonType)) {
          throw new UnprocessableError('Tipo 1 inserido inválido.');
        }

        enum_type1 = type1 as pokemonType;
      }

      if (!type2) {
        enum_type2 = pokemon.type2;
      } else {
        if (!Object.values(pokemonType).includes(type2 as pokemonType)) {
          throw new UnprocessableError('Tipo 2 inserido inválido.');
        }

        enum_type2 = type2 as pokemonType;
      }

      if (!rarity) {
        enum_rarity = pokemon.rarity;
      } else {
        if (!Object.values(Rarity).includes(rarity as Rarity)) {
          throw new UnprocessableError('Raridade inserida inválida.');
        }
        enum_rarity = rarity as Rarity;
      }

      if (!level) {
        num_level = pokemon.level;
      } else {
        num_level = Number(level);
        if (isNaN(num_level)) {
          throw new UnprocessableError('Valor de nível deve ser numérico.');
        }
      }

      if (!attack) {
        num_attack = pokemon.attack;
      } else {
        num_attack = Number(attack);
        if (isNaN(num_attack)) {
          throw new UnprocessableError('Valor de ataque deve ser numérico.');
        }
      }

      if (!defense) {
        num_defense = pokemon.defense;
      } else {
        num_defense = Number(defense);
        if (isNaN(num_defense)) {
          throw new UnprocessableError('Valor de defesa deve ser numérico.');
        }
      }

      if (!hp) {
        num_hp = pokemon.hp;
      } else {
        num_hp = Number(hp);
        if (isNaN(num_hp)) {
          throw new UnprocessableError('Valor de HP deve ser numérico.');
        }
      }

      if (!nickname) {
        nickname = pokemon.nickname;
      }

      if (!trainerId) {
        trainerId = pokemon.trainerId;
      } else {
        const TrainerExists = await this.TrainerRepository.findById(trainerId);

        if (!TrainerExists) {
          throw new NotFoundError('Treinador.');
        }
      }
    }

    const newPokemon = new Pokemon({
      id: num_id,
      name: name,
      type1: enum_type1,
      type2: enum_type2,
      rarity: enum_rarity,
      level: num_level,
      stats: {
        attack: Number(num_attack),
        defense: Number(num_defense),
        hp: Number(num_hp),
      },
      nickname: nickname,
      trainerId: trainerId,
    });

    await this.PokemonRepository.update(newPokemon);
    return newPokemon;
  }
}
