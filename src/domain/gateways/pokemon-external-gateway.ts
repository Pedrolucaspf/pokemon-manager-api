export interface ExternalPokemonDetails {
  spriteUrl: string;
  base_experience: number;
  height: number;
  weight: number;
}

export interface PokemonExternalGateway {
  findByName(name: string): Promise<ExternalPokemonDetails | null>;
}
