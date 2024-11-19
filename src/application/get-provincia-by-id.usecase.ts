import type { Provincia } from '@/domain/provincia.entity';
import { ProvinciaRepository } from '@/domain/provincia.repository';

export class GetProvinciaByIdUseCase {
  constructor(private readonly provinciaRepository: ProvinciaRepository) {}

  async execute(idProvincia: number): Promise<Provincia | null> {
    return this.provinciaRepository.findById(idProvincia);
  }
}
