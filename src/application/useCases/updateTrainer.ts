import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { AppError } from '@domain/errors/app.error';

export class UpdateTrainerUseCase {
  constructor(private TrainerRepository: ITrainerRepository) {}

  async execute(name: string, email: string, city: string): Promise<Trainer> {
    const trainer = await this.TrainerRepository.findByEmail(email);

    if (!trainer) {
      throw new AppError('Trainer não encontrado no catálogo.', 404);
    }

    if (!name && !city) {
      throw new AppError(
        'Atualização vazia: novo name/type/rarity/attack/defense/hp deve ser inserido.',
        4000,
      );
    } else {
      if (!name) {
        name = trainer.name;
      }

      if (!city) {
        city = trainer.city;
      }
    }

    const newTrainer = new Trainer({
      name: name,
      email: email,
      city: city,
    });

    await this.TrainerRepository.update(newTrainer);
    return newTrainer;
  }
}
