import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { NotFoundError } from '@domain/errors/not-found-error';

export class DeleteTrainerUseCase {
  constructor(private TrainerRepository: ITrainerRepository) {}

  async execute(email: string): Promise<Trainer> {
    const trainer = await this.TrainerRepository.findByEmail(email);

    if (!trainer) {
      throw new NotFoundError('Treinador');
    }

    await this.TrainerRepository.delete(email);
    return trainer;
  }
}
