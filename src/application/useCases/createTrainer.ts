import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { ConflictError } from '@domain/errors/conflict-error';

interface CreateTrainerDTO {
  name: string;
  email: string;
  city: string;
}

export class CreateTrainerUseCase {
  constructor(private TrainerRepository: ITrainerRepository) {}

  async execute(data: CreateTrainerDTO): Promise<Trainer> {
    const TrainerAlreadyExists = await this.TrainerRepository.findByEmail(
      data.email,
    );

    if (TrainerAlreadyExists) {
      throw new ConflictError('Trainer com este email já está cadastrado.');
    }

    const newTrainer = new Trainer({
      name: data.name,
      email: data.email,
      city: data.city,
    });

    await this.TrainerRepository.create(newTrainer);
    return newTrainer;
  }
}
