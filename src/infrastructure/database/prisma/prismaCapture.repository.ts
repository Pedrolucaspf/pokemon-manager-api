import { Capture } from '@domain/entities/capture';
import { ICaptureRepository } from '@domain/repositories/capture.repository';
import { Capture as PrismaCapture } from '../../../../generated/prisma/client';
import { prisma } from './client';

export class PrismaCaptureRepository implements ICaptureRepository {
  async create(capture: Capture): Promise<void> {
    await prisma.capture.create({
      data: {
        trainerId: capture.trainerId,
        pokemonName: capture.pokemonName,
        spriteUrl: capture.spriteUrl,
        base_experience: capture.base_experience,
        height: capture.height,
        weight: capture.weight,
      },
    });
  }

  async findAll(): Promise<Capture[]> {
    const capturesRaw = await prisma.capture.findMany();

    return capturesRaw.map(
      (row: PrismaCapture) =>
        new Capture({
          id: row.id,
          trainerId: row.trainerId,
          pokemonName: row.pokemonName,
          spriteUrl: row.spriteUrl,
          base_experience: row.base_experience,
          height: row.height,
          weight: row.weight,
        }),
    );
  }

  async listByTrainerId(trainerId: string): Promise<Capture[]> {
    const capturesRaw = await prisma.capture.findMany({
      where: { trainerId: trainerId },
    });

    return capturesRaw.map(
      (row: PrismaCapture) =>
        new Capture({
          id: row.id,
          trainerId: row.trainerId,
          pokemonName: row.pokemonName,
          spriteUrl: row.spriteUrl,
          base_experience: row.base_experience,
          height: row.height,
          weight: row.weight,
        }),
    );
  }

  async countPokemonsByTrainer(trainerId: string): Promise<number> {
    const numPokemons: number = await prisma.capture.count({
      where: {
        trainerId: trainerId,
      },
    });
    return numPokemons;
  }
}
