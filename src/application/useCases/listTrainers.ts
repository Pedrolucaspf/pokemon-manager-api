import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';

export class ListTrainersUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(name?: string): Promise<Trainer[]> {
    if (name) {
      return await this.trainerRepository.searchByName(name);
    }
    return await this.trainerRepository.findAll();
  }
}
