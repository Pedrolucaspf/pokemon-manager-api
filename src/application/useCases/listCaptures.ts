import { Capture } from '@domain/entities/capture';
import { ICaptureRepository } from '@domain/repositories/capture.repository';

export class ListCapturesUseCase {
  constructor(private captureRepository: ICaptureRepository) {}

  async execute(trainerId?: string): Promise<Capture[]> {
    if (trainerId) {
      return await this.captureRepository.listByTrainerId(trainerId);
    }
    return await this.captureRepository.findAll();
  }
}
