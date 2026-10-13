import { Request, Response } from 'express';
import { ListTrainersUseCase } from '@application/useCases/listTrainers';
import { CreateTrainerUseCase } from '@application/useCases/createTrainer';
import { GetTrainerByEmailUseCase } from '@application/useCases/getTrainerByEmail';
import { UpdateTrainerUseCase } from '@application/useCases/updateTrainer';
import { DeleteTrainerUseCase } from '@application/useCases/deleteTrainer';

export class TrainerController {
  constructor(
    private listTrainersUseCase: ListTrainersUseCase,
    private createTrainerUseCase: CreateTrainerUseCase,
    private getTrainerByEmailUseCase: GetTrainerByEmailUseCase,
    private updateTrainerUseCase: UpdateTrainerUseCase,
    private deleteTrainerUseCase: DeleteTrainerUseCase,
  ) {}
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, city } = req.body;
    const trainer = await this.createTrainerUseCase.execute({
      name,
      email,
      city,
    });

    return res.status(201).json({
      message: 'Trainer cadastrado com sucesso!',
      data: trainer,
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;
    const { name, city } = req.body;
    const trainer = await this.updateTrainerUseCase.execute(
      name,
      String(email),
      city,
    );

    return res.status(200).json({
      message: 'Treinador atualizado.',
      data: trainer,
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;
    const trainer = await this.deleteTrainerUseCase.execute(String(email));
    return res.status(200).json(trainer);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const name = req.query.name as string;
    let trainers;
    if (name) {
      trainers = await this.listTrainersUseCase.execute(name);
    } else {
      trainers = await this.listTrainersUseCase.execute();
    }

    const formattedTrainers = trainers.map((trainer) => ({
      id: trainer.id,
      name: trainer.name,
      email: trainer.email,
      city: trainer.city,
    }));

    return res.status(200).json({ data: formattedTrainers });
  }

  async getByEmail(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;
    const trainer = await this.getTrainerByEmailUseCase.execute(String(email));
    return res.status(200).json(trainer);
  }
}
