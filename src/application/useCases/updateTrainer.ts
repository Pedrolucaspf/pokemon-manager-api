import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { NotFoundError } from '@domain/errors/not-found-error';
import { BadRequestError } from '@domain/errors/bad-request-error';

export class UpdateTrainerUseCase {
  constructor(private TrainerRepository: ITrainerRepository) {}

  async execute(name: string, email: string, city: string): Promise<Trainer> {
    const trainer = await this.TrainerRepository.findByEmail(email);

    if (!trainer) {
      throw new NotFoundError('Treinador');
    }

    if (!name && !city) {
      throw new BadRequestError(
        'Atualização vazia: novo name/type/rarity/attack/defense/hp deve ser inserido.',
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
