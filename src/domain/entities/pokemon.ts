import { ConflictError } from '@domain/errors/conflict-error';
import { UnprocessableError } from '@domain/errors/unprocessable-error';

export enum pokemonType {
  NORMAL = 'Normal',
  GRASS = 'Grass',
  FIRE = 'Fire',
  WATER = 'Water',
  ELECTRIC = 'Electric',
  ICE = 'Ice',
  FIGHTING = 'Fighting',
  GROUND = 'Ground',
  POISON = 'Poison',
  FLYING = 'Flying',
  PSYCHIC = 'Psychic',
  BUG = 'Bug',
  ROCK = 'Rock',
  GHOST = 'Ghost',
  DRAGON = 'Dragon',
  DARK = 'Dark',
  STEEL = 'Steel',
  FAIRY = 'Fairy',
}

export enum Rarity {
  COMMON = 'Common',
  RARE = 'Rare',
  LEGENDARY = 'Legendary',
}

export interface IPokemonBattleStats {
  attack: number;
  defense: number;
  hp: number;
}

export interface PokemonProps {
  id: number;
  name: string;
  type1: pokemonType;
  type2?: pokemonType;
  rarity: Rarity;
  level: number;
  stats: IPokemonBattleStats;
  nickname?: string;
  trainerId?: string;
}

export class Pokemon {
  private props: PokemonProps;

  constructor(props: PokemonProps) {
    if (props.stats.attack < 0) {
      throw new UnprocessableError('Valor inválido para o ataque.');
    } else if (props.stats.defense < 0) {
      throw new UnprocessableError('Valor inválido para a defesa.');
    } else if (props.stats.hp < 0) {
      throw new UnprocessableError('Valor inválido para o hp.');
    } else if (
      !Object.values(pokemonType).includes(props.type1 as pokemonType)
    ) {
      throw new UnprocessableError('Tipo 1 inserido inválido.');
    } else if (props.type2 != null) {
      if (!Object.values(pokemonType).includes(props.type2 as pokemonType)) {
        throw new UnprocessableError('Tipo 2 inserido inválido.');
      } else if (props.type2 === props.type1) {
        throw new ConflictError('Tipos 1 e 2 não podem ser iguais.');
      }
    } else if (!Object.values(Rarity).includes(props.rarity as Rarity)) {
      throw new UnprocessableError('Raridade inserida inválida.');
    }
    this.props = props;
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get type1() {
    return this.props.type1;
  }
  get type2() {
    return this.props.type2;
  }
  get rarity() {
    return this.props.rarity;
  }
  get level() {
    return this.props.level;
  }
  get attack() {
    return this.props.stats.attack;
  }
  get defense() {
    return this.props.stats.defense;
  }
  get hp() {
    return this.props.stats.hp;
  }
  get nickname() {
    return this.props.nickname;
  }
  get trainerId() {
    return this.props.trainerId;
  }
}
