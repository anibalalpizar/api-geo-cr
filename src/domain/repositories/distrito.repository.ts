import type { Distrito } from '@/domain/entities/distrito.entity';

export interface DistritoRepository {
  findAll(): Promise<Distrito[]>;
  findById(idDistrito: number): Promise<Distrito | null>;
  findByCantonId(idCanton: number): Promise<Distrito[]>;
}
