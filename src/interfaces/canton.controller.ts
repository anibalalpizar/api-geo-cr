import { GetAllCantonesUseCase } from '@/application/get-all-cantones.usecase';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';
import { generateApiResponse } from '@/utils/response.util';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('cantones')
export class CantonController {
  constructor(private readonly getAllCantonesUseCase: GetAllCantonesUseCase) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 7) {
    const pagination = { page: Number(page), limit: Number(limit) };
    const result = await this.getAllCantonesUseCase.execute(pagination);

    return generateApiResponse(
      ResponseStatus.SUCCESS,
      ResponseMessages.CANTONES_FETCHED_SUCCESSFULLY,
      result.data,
      pagination.page,
      pagination.limit,
      result.meta.totalItems,
    );
  }
}
