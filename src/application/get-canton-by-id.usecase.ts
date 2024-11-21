import type { Canton } from '@/domain/entities';
import { CantonRepository } from '@/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetCantonByIdUseCase {
  constructor(
    @Inject('CantonRepository')
    private readonly cantonRepository: CantonRepository,
  ) {}

  async execute(idCanton: number): Promise<Canton | null> {
    return this.cantonRepository.findById(idCanton);
  }
}
