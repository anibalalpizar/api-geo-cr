import { GetAllCantonesUseCase } from '@/application/get-all-cantones.usecase';
import { GetDistritosByCantonUseCase } from '@/application/get-distritos-by-canton.usecase';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';
import { generateApiResponse } from '@/utils/response.util';
import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('cantones')
@Controller('cantones')
export class CantonController {
  constructor(
    private readonly getAllCantonesUseCase: GetAllCantonesUseCase,
    private readonly getDistritosByCantonUseCase: GetDistritosByCantonUseCase,
  ) {}

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

  @Get(':id/distritos')
  @ApiOperation({ summary: 'Obtener distritos de un cantón' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del cantón' })
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
    description: 'Lista de distritos obtenida exitosamente',
  })
  async findDistritosByCantonId(
    @Query('page') page = 1,
    @Query('limit') limit = 7,
    @Param('id') id: string,
  ) {
    const pagination = { page: Number(page), limit: Number(limit) };
    const result = await this.getDistritosByCantonUseCase.execute(
      pagination,
      Number(id),
    );

    return generateApiResponse(
      ResponseStatus.SUCCESS,
      ResponseMessages.DISTRITOS_BY_CANTON_FETCHED_SUCCESSFULLY,
      result.data,
      pagination.page,
      pagination.limit,
      result.meta.totalItems,
    );
  }
}
