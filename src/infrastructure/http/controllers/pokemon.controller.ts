import { Request, Response } from 'express';
import { ListPokemonsUseCase } from '@application/useCases/listPokemons';
import { CreatePokemonUseCase } from '@application/useCases/createPokemon';
import { GetPokemonByIdUseCase } from '@application/useCases/getPokemonById';
import { UpdatePokemonUseCase } from '@application/useCases/updatePokemon';
import { DeletePokemonUseCase } from '@application/useCases/deletePokemon';

export class PokemonController {
  constructor(
    private listPokemonsUseCase: ListPokemonsUseCase,
    private createPokemonUseCase: CreatePokemonUseCase,
    private getPokemonByIdUseCase: GetPokemonByIdUseCase,
    private updatePokemonUseCase: UpdatePokemonUseCase,
    private deletePokemonUseCase: DeletePokemonUseCase,
  ) {}
  async create(req: Request, res: Response): Promise<Response> {
    const {
      id,
      name,
      type1,
      type2,
      rarity,
      level,
      attack,
      defense,
      hp,
      nickname,
    } = req.body;
    const pokemon = await this.createPokemonUseCase.execute({
      id,
      name,
      type1,
      type2,
      rarity,
      attack,
      level,
      defense,
      hp,
      nickname,
    });

    return res.status(201).json({
      message: 'Pokemon cadastrado com sucesso!',
      data: pokemon,
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, type1, type2, rarity, level, attack, defense, hp, nickname } =
      req.body;
    const pokemon = await this.updatePokemonUseCase.execute(
      String(id),
      name,
      type1,
      type2,
      rarity,
      level,
      attack,
      defense,
      hp,
      nickname,
    );

    return res.status(200).json({
      message: 'Pokemon atualizado.',
      data: pokemon,
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const pokemon = await this.deletePokemonUseCase.execute(String(id));
    return res.status(200).json(pokemon);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const type = req.query.type as string;
    let pokemons;
    if (type) {
      pokemons = await this.listPokemonsUseCase.execute(type);
    } else {
      pokemons = await this.listPokemonsUseCase.execute();
    }

    const formattedPokemons = pokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      type1: pokemon.type1,
      type2: pokemon.type2,
      rarity: pokemon.rarity,
      level: pokemon.level,
      attack: pokemon.attack,
      defense: pokemon.defense,
      hp: pokemon.hp,
      nickname: pokemon.nickname,
    }));

    return res.status(200).json({ data: formattedPokemons });
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const pokemon = await this.getPokemonByIdUseCase.execute(String(id));
    return res.status(200).json(pokemon);
  }
}
