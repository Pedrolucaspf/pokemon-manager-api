import { Capture } from '@domain/entities/capture';
import { ICaptureRepository } from '@domain/repositories/capture.repository';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { PokemonExternalGateway } from '@domain/gateways/pokemon-external-gateway';
import { NotFoundError } from '@domain/errors/not-found-error';
import { ConflictError } from '@domain/errors/conflict-error';

interface CreateCaptureDTO {
  trainerId: string;
  pokemonName: string;
}

export class CreateCaptureUseCase {
  constructor(
    private CaptureRepository: ICaptureRepository,
    private TrainerRepository: ITrainerRepository,
    private readonly pokeExternalGateway: PokemonExternalGateway,
  ) {}

  async execute(data: CreateCaptureDTO): Promise<Capture> {
    const existsInExternalApi = await this.pokeExternalGateway.findByName(
      data.pokemonName,
    );

    if (!existsInExternalApi) {
      throw new NotFoundError('Pokemon com este nome');
    }

    const trainerExists = await this.TrainerRepository.findById(data.trainerId);

    if (!trainerExists) {
      throw new NotFoundError('Treinador');
    } else {
      const numPokemonsDoTreinador =
        await this.CaptureRepository.countPokemonsByTrainer(data.trainerId);
      if (numPokemonsDoTreinador >= 6) {
        throw new ConflictError(
          'Treinador já alcançou o limite máximo de 6 pokemons. Não é possível adicionar mais.',
        );
      }
    }

    const newCapture = new Capture({
      trainerId: data.trainerId,
      pokemonName: data.pokemonName,
      spriteUrl: existsInExternalApi.spriteUrl,
      base_experience: existsInExternalApi.base_experience,
      height: existsInExternalApi.height,
      weight: existsInExternalApi.weight,
    });

    await this.CaptureRepository.create(newCapture);
    return newCapture;
  }
}
