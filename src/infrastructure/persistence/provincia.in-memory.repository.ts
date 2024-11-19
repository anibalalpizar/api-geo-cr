import type { Provincia } from '@/domain/provincia.entity';
import { ProvinciaRepository } from '@/domain/provincia.repository';
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
