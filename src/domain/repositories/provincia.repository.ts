import type { Provincia } from '@/domain/entities';

export interface ProvinciaRepository {
  findAll(): Promise<Provincia[]>;
  findById(idProvincia: number): Promise<Provincia | null>;
}
