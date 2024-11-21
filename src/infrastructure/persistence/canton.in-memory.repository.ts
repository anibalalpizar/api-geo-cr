import type { Canton } from '@/domain/entities';
import { CantonRepository } from '@/domain/repositories';
import { Injectable } from '@nestjs/common';
import { cantonesData } from './data/canton.data';

@Injectable()
export class InMemoryCantonRepository implements CantonRepository {
  private readonly cantones: Canton[] = cantonesData;

  async findAll(): Promise<Canton[]> {
    return this.cantones;
  }

  async findById(idCanton: number): Promise<Canton | null> {
    return this.cantones.find((canton) => canton.idCanton === idCanton) || null;
  }

  async findByProvinciaId(idProvincia: number): Promise<Canton[]> {
    return this.cantones.filter((canton) => canton.idProvincia === idProvincia);
  }
}
