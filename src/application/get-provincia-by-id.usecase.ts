import { Injectable, Inject } from '@nestjs/common';
import type { Provincia } from '@/domain/entities';
import { ProvinciaRepository } from '@/domain/repositories';

@Injectable()
export class GetProvinciaByIdUseCase {
  constructor(
    @Inject('ProvinciaRepository')
    private readonly provinciaRepository: ProvinciaRepository,
  ) {}

  async execute(idProvincia: number): Promise<Provincia | null> {
    return this.provinciaRepository.findById(idProvincia);
  }
}
