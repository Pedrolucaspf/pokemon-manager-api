import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  public items: Pokemon[] = [];

  async create(pokemon: Pokemon): Promise<void> {
    this.items.push(pokemon);
  }

  async update(pokemon: Pokemon): Promise<void> {
    const pokemon_index = this.items.findIndex((p) => p.id === pokemon.id);
    console.log(pokemon_index);
    this.items[pokemon_index] = pokemon;
  }

  async delete(id: number): Promise<void> {
    const pokemon_index = this.items.findIndex((p) => p.id === id);
    this.items.splice(pokemon_index, 1);
  }

  async findByType(type: string): Promise<Pokemon[] | null> {
    const pokemons = this.items.filter(
      (p) => p.type.toLowerCase() === String(type).toLowerCase(),
    );
    if (!pokemons) return null;
    return pokemons;
  }

  async findById(id: number): Promise<Pokemon | null> {
    const pokemon = this.items.find((p) => p.id === id);
    if (!pokemon) return null;
    return pokemon;
  }

  async findAll(): Promise<Pokemon[]> {
    return this.items;
  }
}
