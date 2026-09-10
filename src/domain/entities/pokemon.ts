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
  type: pokemonType;
  rarity: Rarity;
  stats: IPokemonBattleStats;
  nickname?: string;
}

export class Pokemon {
  private props: PokemonProps;

  constructor(props: PokemonProps) {
    if (props.stats.attack < 0) {
      throw new Error('Valor inválido para o ataque.');
    } else if (props.stats.defense < 0) {
      throw new Error('Valor inválido para a defesa.');
    } else if (props.stats.hp < 0) {
      throw new Error('Valor inválido para o hp.');
    }
    this.props = props;
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get type() {
    return this.props.type;
  }
  get rarity() {
    return this.props.rarity;
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
}
