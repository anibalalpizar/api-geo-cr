import type { Distrito } from '@/domain/entities/distrito.entity';
import { DistritoRepository } from '@/domain/repositories/distrito.repository';
import { Injectable } from '@nestjs/common';
import { distritosData } from './data/distrito.data';

@Injectable()
export class InMemoryDistritoRepository implements DistritoRepository {
  private readonly distritos: Distrito[] = distritosData;

  async findAll(): Promise<Distrito[]> {
    return this.distritos;
  }

  async findById(idDistrito: number): Promise<Distrito | null> {
    return (
      this.distritos.find((distrito) => distrito.idDistrito === idDistrito) ||
      null
    );
  }

  async findByCantonId(idCanton: number): Promise<Distrito[]> {
    return this.distritos.filter((distrito) => distrito.idCanton === idCanton);
  }
}
