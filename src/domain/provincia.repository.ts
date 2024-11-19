import type { Provincia } from './provincia.entity';

export interface ProvinciaRepository {
  findAll(): Promise<Provincia[]>;
  findById(idProvincia: number): Promise<Provincia | null>;
}
