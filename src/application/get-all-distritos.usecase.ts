import { DistritoRepository } from '@/domain/repositories';
import type { Pagination } from '@/types';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';
import { generateApiResponse } from '@/utils/response.util';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetAllDistritosUseCase {
  constructor(
    @Inject('DistritoRepository')
    private readonly distritoRepository: DistritoRepository,
  ) {}

  async execute(pagination: Pagination): Promise<any> {
    const { page, limit } = pagination;

    const distritos = await this.distritoRepository.findAll();

    const totalItems = distritos.length;
    const currentPage = page;

    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);

    const paginatedDistritos = distritos.slice(startIndex, endIndex);

    return generateApiResponse(
      ResponseStatus.SUCCESS,
      ResponseMessages.DISTRITOS_FETCHED_SUCCESSFULLY,
      paginatedDistritos,
      currentPage,
      limit,
      totalItems,
    );
  }
}
