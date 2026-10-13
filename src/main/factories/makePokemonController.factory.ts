import { ListPokemonsUseCase } from '@application/useCases/listPokemons';
import { CreatePokemonUseCase } from '@application/useCases/createPokemon';
import { PokemonController } from '@infrastructure/http/controllers/pokemon.controller';
import { PrismaPokemonRepository } from '@infrastructure/database/prisma/prismaPokemon.repository';
import { PrismaTrainerRepository } from '@infrastructure/database/prisma/prismaTrainer.repository';
import { GetPokemonByIdUseCase } from '@application/useCases/getPokemonById';
import { UpdatePokemonUseCase } from '@application/useCases/updatePokemon';
import { DeletePokemonUseCase } from '@application/useCases/deletePokemon';

// Repositório compartilhado (Singleton em memória durante o runtime)
const pokemonRepository = new PrismaPokemonRepository();
const trainerRepository = new PrismaTrainerRepository();

export function makePokemonController(): PokemonController {
  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);
  const createPokemonUseCase = new CreatePokemonUseCase(
    pokemonRepository,
    trainerRepository,
  );
  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(
    pokemonRepository,
    trainerRepository,
  );
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);

  return new PokemonController(
    listPokemonsUseCase,
    createPokemonUseCase,
    getPokemonByIdUseCase,
    updatePokemonUseCase,
    deletePokemonUseCase,
  );
}
