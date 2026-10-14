import { Capture } from '@domain/entities/capture';

export interface ICaptureRepository {
  create(capture: Capture): Promise<void>;
  listByTrainerId(trainerId: string): Promise<Capture[]>;
  findAll(): Promise<Capture[]>;
  countPokemonsByTrainer(trainerId: string): Promise<number>;
}
