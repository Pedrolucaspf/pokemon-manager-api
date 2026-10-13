import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { Trainer as PrismaTrainer } from '../../../../generated/prisma/client';
import { prisma } from './client';

export class PrismaTrainerRepository implements ITrainerRepository {
  async create(trainer: Trainer): Promise<void> {
    await prisma.trainer.create({
      data: {
        name: trainer.name,
        email: trainer.email,
        city: trainer.city,
      },
    });
  }

  async update(trainer: Trainer): Promise<void> {
    await prisma.trainer.update({
      where: { email: trainer.email },
      data: {
        name: trainer.name,
        city: trainer.city,
      },
    });
  }

  async delete(email: string): Promise<void> {
    await prisma.trainer.delete({
      where: {
        email: email,
      },
    });
  }

  async findAll(): Promise<Trainer[]> {
    const trainersRaw = await prisma.trainer.findMany();

    return trainersRaw.map(
      (row: PrismaTrainer) =>
        new Trainer({
          name: row.name,
          email: row.email,
          city: row.city,
        }),
    );
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    const row = await prisma.trainer.findUnique({
      where: { email: email },
    });

    if (!row) {
      return null;
    }

    return new Trainer({
      name: row.name,
      email: row.email,
      city: row.city,
    });
  }

  async searchByName(name: string): Promise<Trainer[]> {
    const trainersRaw = await prisma.trainer.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return trainersRaw.map(
      (row: PrismaTrainer) =>
        new Trainer({
          name: row.name,
          email: row.email,
          city: row.city,
        }),
    );
  }
}
