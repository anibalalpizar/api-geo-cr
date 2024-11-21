import type { Distrito } from '@/domain/entities/distrito.entity';
import { DistritoRepository } from '@/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetDistritoByIdUseCase {
  constructor(
    @Inject('DistritoRepository')
    private readonly distritoRepository: DistritoRepository,
  ) {}

  async execute(idDistrito: number): Promise<Distrito | null> {
    return this.distritoRepository.findById(idDistrito);
  }
}
