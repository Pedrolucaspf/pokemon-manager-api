import { ListCapturesUseCase } from '@application/useCases/listCaptures';
import { CreateCaptureUseCase } from '@application/useCases/createCapture';
import { CaptureController } from '@infrastructure/http/controllers/capture.controller';
import { PrismaCaptureRepository } from '@infrastructure/database/prisma/prismaCapture.repository';
import { PrismaTrainerRepository } from '@infrastructure/database/prisma/prismaTrainer.repository';
import { PokeApiAxiosGateway } from '@infrastructure/gateways/pokeapi-axios-gateway';

// Repositório compartilhado (Singleton em memória durante o runtime)
const captureRepository = new PrismaCaptureRepository();
const trainerRepository = new PrismaTrainerRepository();
const pokeAxiosGateway = new PokeApiAxiosGateway();

export function makeCaptureController(): CaptureController {
  const listCapturesUseCase = new ListCapturesUseCase(captureRepository);
  const createCaptureUseCase = new CreateCaptureUseCase(
    captureRepository,
    trainerRepository,
    pokeAxiosGateway,
  );

  return new CaptureController(listCapturesUseCase, createCaptureUseCase);
}
