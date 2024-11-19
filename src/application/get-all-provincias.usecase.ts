import type { Provincia } from '@/domain/provincia.entity';
import { ProvinciaRepository } from '@/domain/provincia.repository';

export class GetAllProvinciasUseCase {
  constructor(private readonly provinciaRepository: ProvinciaRepository) {}

  async execute(): Promise<Provincia[]> {
    return this.provinciaRepository.findAll();
  }
}
