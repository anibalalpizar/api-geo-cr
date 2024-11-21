import type { Canton } from '@/domain/entities';

export interface CantonRepository {
  findAll(): Promise<Canton[]>;
  findById(idCanton: number): Promise<Canton | null>;
  findByProvinciaId(idProvincia: number): Promise<Canton[]>;
}
