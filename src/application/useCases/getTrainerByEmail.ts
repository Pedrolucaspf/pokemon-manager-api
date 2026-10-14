import { Trainer } from '@domain/entities/trainer';
import { NotFoundError } from '@domain/errors/not-found-error';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';

export class GetTrainerByEmailUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(email: string): Promise<Trainer | null> {
    const trainer = await this.trainerRepository.findByEmail(email);
    if (trainer) {
      return trainer;
    } else {
      throw new NotFoundError('Treinador');
    }
  }
}
