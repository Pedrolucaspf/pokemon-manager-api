import { Request, Response } from 'express';
import { ListCapturesUseCase } from '@application/useCases/listCaptures';
import { CreateCaptureUseCase } from '@application/useCases/createCapture';

export class CaptureController {
  constructor(
    private listCapturesUseCase: ListCapturesUseCase,
    private createCaptureUseCase: CreateCaptureUseCase,
  ) {}
  async create(req: Request, res: Response): Promise<Response> {
    const { trainerId } = req.params;
    const strTrainerId = String(trainerId);
    const { pokemonName } = req.body;
    const capture = await this.createCaptureUseCase.execute({
      trainerId: strTrainerId,
      pokemonName,
    });

    return res.status(201).json({
      message: 'Captura cadastrada com sucesso!',
      data: capture,
    });
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { trainerId } = req.params;
    let captures;
    if (trainerId) {
      captures = await this.listCapturesUseCase.execute(String(trainerId));
    } else {
      captures = await this.listCapturesUseCase.execute();
    }

    const formattedCaptures = captures.map((capture) => ({
      id: capture.id,
      trainerId: capture.trainerId,
      pokemonName: capture.pokemonName,
      spriteUrl: capture.spriteUrl,
      base_experience: capture.base_experience,
      height: capture.height,
      weight: capture.weight,
    }));

    return res.status(200).json({ data: formattedCaptures });
  }
}
