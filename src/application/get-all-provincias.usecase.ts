import { ProvinciaRepository } from '@/domain/repositories';
import type { Pagination } from '@/types';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';
import { generateApiResponse } from '@/utils/response.util';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetAllProvinciasUseCase {
  constructor(
    @Inject('ProvinciaRepository')
    private readonly provinciaRepository: ProvinciaRepository,
  ) {}

  async execute(pagination: Pagination): Promise<any> {
    const { page, limit } = pagination;

    const provincias = await this.provinciaRepository.findAll();

    const totalItems = provincias.length;
    const currentPage = page;

    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);

    const paginatedProvincias = provincias.slice(startIndex, endIndex);

    return generateApiResponse(
      ResponseStatus.SUCCESS,
      ResponseMessages.PROVINCIAS_FETCHED_SUCCESSFULLY,
      paginatedProvincias,
      currentPage,
      limit,
      totalItems,
    );
  }
}
