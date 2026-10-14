import { Pokemon, pokemonType, Rarity } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { ConflictError } from '@domain/errors/conflict-error';
import { UnprocessableError } from '@domain/errors/unprocessable-error';
import { NotFoundError } from '@domain/errors/not-found-error';
import { PokemonExternalGateway } from '@domain/gateways/pokemon-external-gateway';

interface CreatePokemonDTO {
  id: string;
  name: string;
  type1: string;
  type2: string;
  rarity: string;
  level: string;
  attack: string;
  defense: string;
  hp: string;
  nickname?: string;
  trainerId?: string;
}

export class CreatePokemonUseCase {
  constructor(
    private PokemonRepository: IPokemonRepository,
    private TrainerRepository: ITrainerRepository,
    private readonly pokeExternalGateway: PokemonExternalGateway,
  ) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const id = Number(data.id);
    const PokemonAlreadyExists = await this.PokemonRepository.findById(id);

    if (PokemonAlreadyExists) {
      throw new ConflictError('Pokemon com este id já está cadastrado.');
    }

    const existsInExternalApi = await this.pokeExternalGateway.findByName(
      data.name,
    );

    if (!existsInExternalApi) {
      throw new NotFoundError('Pokemon com este nome');
    }

    if (!Object.values(pokemonType).includes(data.type1 as pokemonType)) {
      throw new UnprocessableError('Tipo 1 inserido inválido.');
    }

    const enum_type1 = data.type1 as pokemonType;

    let enum_type2;
    if (data.type2 != null) {
      if (!Object.values(pokemonType).includes(data.type2 as pokemonType)) {
        throw new UnprocessableError('Tipo 2 inserido inválido.');
      }
      enum_type2 = data.type2 as pokemonType;
    }

    if (!Object.values(Rarity).includes(data.rarity as Rarity)) {
      throw new UnprocessableError('Raridade inserida inválida.');
    }

    const enum_rarity = data.rarity as Rarity;

    const num_level = Number(data.level);
    if (isNaN(num_level)) {
      throw new UnprocessableError('Valor de nível deve ser numérico.');
    }

    const num_attack = Number(data.attack);
    if (isNaN(num_attack)) {
      throw new UnprocessableError('Valor de ataque deve ser numérico.');
    }

    const num_defense = Number(data.defense);
    if (isNaN(num_defense)) {
      throw new UnprocessableError('Valor de defesa deve ser numérico.');
    }

    const num_hp = Number(data.hp);
    if (isNaN(num_hp)) {
      throw new UnprocessableError('Valor de HP deve ser numérico.');
    }

    if (data.trainerId != null) {
      const TrainerExists = await this.TrainerRepository.findById(
        data.trainerId,
      );

      if (!TrainerExists) {
        throw new NotFoundError('Treinador');
      } else {
        const numPokemonsDoTreinador =
          await this.PokemonRepository.countPokemonsByTrainer(data.trainerId);
        if (numPokemonsDoTreinador >= 6) {
          throw new ConflictError(
            'Treinador já alcançou o limite máximo de 6 pokemons. Não é possível adicionar mais.',
          );
        }
      }
    }

    const newPokemon = new Pokemon({
      id: id,
      name: data.name,
      type1: enum_type1,
      type2: enum_type2,
      rarity: enum_rarity,
      level: num_level,
      stats: {
        attack: num_attack,
        defense: num_defense,
        hp: num_hp,
      },
      nickname: data.nickname,
      trainerId: data.trainerId,
    });

    await this.PokemonRepository.create(newPokemon);
    return newPokemon;
  }
}
