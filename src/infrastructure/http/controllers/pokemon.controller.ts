import { Request, Response } from 'express';
import { ListPokemonsUseCase } from '@application/useCases/listPokemons';
import { CreatePokemonUseCase } from '@application/useCases/createPokemon';
import { GetPokemonByIdUseCase } from '@application/useCases/getPokemonById';
import { UpdatePokemonUseCase } from '@application/useCases/updatePokemon';
import { AppError } from '@domain/errors/app.error';
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
    const { id, name, type, rarity, attack, defense, hp, nickname } = req.body;
    const pokemon = await this.createPokemonUseCase.execute({
      id,
      name,
      type,
      rarity,
      attack,
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
    const { name, type, rarity, attack, defense, hp, nickname } = req.body;
    try {
      const pokemon = await this.updatePokemonUseCase.execute(
        String(id),
        name,
        type,
        rarity,
        attack,
        defense,
        hp,
        nickname,
      );

      return res.status(200).json({
        message: 'Pokemon atualizado.',
        data: pokemon,
      });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
      } else {
        return res.status(404).json({ err });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const pokemon = await this.deletePokemonUseCase.execute(String(id));
      return res.status(200).json(pokemon);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
      } else {
        return res.status(404).json({ err });
      }
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const type = req.query.type as string;
    let pokemons;
    if (type) {
      pokemons = await this.listPokemonsUseCase.execute(type);
    } else {
      pokemons = await this.listPokemonsUseCase.execute();
    }
    if (pokemons) {
      const formattedPokemons = pokemons.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.type,
        rarity: pokemon.rarity,
        attack: pokemon.attack,
        defense: pokemon.defense,
        hp: pokemon.hp,
        nickname: pokemon.nickname,
      }));

      return res.status(200).json({ data: formattedPokemons });
    } else {
      return res.status(404).json({ error: 'Nenhum pokemon foi encontrado.' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const pokemon = await this.getPokemonByIdUseCase.execute(String(id));
      return res.status(200).json(pokemon);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
      } else {
        return res.status(404).json({ err });
      }
    }
  }
}
