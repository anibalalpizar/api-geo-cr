import type { Provincia } from '@/domain/entities';
import { ProvinciaRepository } from '@/domain/repositories';

export class GetProvinciaByIdUseCase {
  constructor(private readonly provinciaRepository: ProvinciaRepository) {}

  async execute(idProvincia: number): Promise<Provincia | null> {
    return this.provinciaRepository.findById(idProvincia);
  }
}
