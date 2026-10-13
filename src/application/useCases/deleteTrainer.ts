import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { AppError } from '@domain/errors/app.error';

export class DeleteTrainerUseCase {
  constructor(private TrainerRepository: ITrainerRepository) {}

  async execute(email: string): Promise<Trainer> {
    const trainer = await this.TrainerRepository.findByEmail(email);

    if (!trainer) {
      throw new AppError('Treinador não encontrado no catálogo.', 404);
    }

    await this.TrainerRepository.delete(email);
    return trainer;
  }
}
