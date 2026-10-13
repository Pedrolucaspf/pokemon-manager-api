import { Trainer } from '@domain/entities/trainer';
import { AppError } from '@domain/errors/app.error';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';

export class GetTrainerByEmailUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(email: string): Promise<Trainer | null> {
    const trainer = await this.trainerRepository.findByEmail(email);
    if (trainer) {
      return trainer;
    } else {
      throw new AppError('Treinador não encontrado no catálogo.', 404);
    }
  }
}
