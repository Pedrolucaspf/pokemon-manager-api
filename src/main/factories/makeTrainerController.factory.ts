import { ListTrainersUseCase } from '@application/useCases/listTrainers';
import { CreateTrainerUseCase } from '@application/useCases/createTrainer';
import { TrainerController } from '@infrastructure/http/controllers/trainer.controller';
import { PgTrainerRepository } from '@infrastructure/database/postgres/pgTrainer.repository';
import { GetTrainerByEmailUseCase } from '@application/useCases/getTrainerByEmail';
import { UpdateTrainerUseCase } from '@application/useCases/updateTrainer';
import { DeleteTrainerUseCase } from '@application/useCases/deleteTrainer';

// Repositório compartilhado (Singleton em memória durante o runtime)
const trainerRepository = new PgTrainerRepository();

export function makeTrainerController(): TrainerController {
  const listTrainersUseCase = new ListTrainersUseCase(trainerRepository);
  const createTrainerUseCase = new CreateTrainerUseCase(trainerRepository);
  const getTrainerByEmailUseCase = new GetTrainerByEmailUseCase(
    trainerRepository,
  );
  const updateTrainerUseCase = new UpdateTrainerUseCase(trainerRepository);
  const deleteTrainerUseCase = new DeleteTrainerUseCase(trainerRepository);

  return new TrainerController(
    listTrainersUseCase,
    createTrainerUseCase,
    getTrainerByEmailUseCase,
    updateTrainerUseCase,
    deleteTrainerUseCase,
  );
}
