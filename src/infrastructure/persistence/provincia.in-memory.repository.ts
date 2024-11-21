import type { Provincia } from '@/domain/entities';
import { ProvinciaRepository } from '@/domain/repositories';
import { provinciasData } from './provincia.data';

export class InMemoryProvinciaRepository implements ProvinciaRepository {
  private readonly provincias: Provincia[] = provinciasData;

  async findAll(): Promise<Provincia[]> {
    return this.provincias;
  }

  async findById(idProvincia: number): Promise<Provincia | null> {
    return (
      this.provincias.find(
        (provincia) => provincia.idProvincia === idProvincia,
      ) || null
    );
  }
}
