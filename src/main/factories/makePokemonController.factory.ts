import { ListPokemonsUseCase } from '@application/useCases/listPokemons';
import { CreatePokemonUseCase } from '@application/useCases/createPokemon';
import { PokemonController } from '@infrastructure/http/controllers/pokemon.controller';
import { InMemoryPokemonRepository } from '@infrastructure/database/inMemoryPokemon.repository';
import { GetPokemonByIdUseCase } from '@application/useCases/getPokemonById';
import { UpdatePokemonUseCase } from '@application/useCases/updatePokemon';
import { DeletePokemonUseCase } from '@application/useCases/deletePokemon';

// Repositório compartilhado (Singleton em memória durante o runtime)
const pokemonRepository = new InMemoryPokemonRepository();

export function makePokemonController(): PokemonController {
  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);

  return new PokemonController(
    listPokemonsUseCase,
    createPokemonUseCase,
    getPokemonByIdUseCase,
    updatePokemonUseCase,
    deletePokemonUseCase,
  );
}
