import { CantonRepository } from '@/domain/repositories';
import type { Pagination } from '@/types';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';
import { generateApiResponse } from '@/utils/response.util';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetAllCantonesUseCase {
  constructor(
    @Inject('CantonRepository')
    private readonly cantonRepository: CantonRepository,
  ) {}

  async execute(pagination: Pagination): Promise<any> {
    const { page, limit } = pagination;

    const cantones = await this.cantonRepository.findAll();

    const totalItems = cantones.length;
    const currentPage = page;

    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);

    const paginatedCantones = cantones.slice(startIndex, endIndex);

    return generateApiResponse(
      ResponseStatus.SUCCESS,
      ResponseMessages.CANTONES_FETCHED_SUCCESSFULLY,
      paginatedCantones,
      currentPage,
      limit,
      totalItems,
    );
  }
}
