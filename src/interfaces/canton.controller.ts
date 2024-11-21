import { GetAllCantonesUseCase } from '@/application/get-all-cantones.usecase';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';
import { generateApiResponse } from '@/utils/response.util';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cantones')
@Controller('cantones')
export class CantonController {
  constructor(private readonly getAllCantonesUseCase: GetAllCantonesUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cantones' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad de items por página',
    example: 7,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de cantones obtenida exitosamente',
  })
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
