import { GetAllCantonesUseCase } from '@/application/get-all-cantones.usecase';
import { GetCantonByIdUseCase } from '@/application/get-canton-by-id.usecase';
import { GetDistritosByCantonUseCase } from '@/application/get-distritos-by-canton.usecase';
import { ResponseMessages, ResponseStatus } from '@/constants';
import { generateApiResponse } from '@/utils/response.util';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
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
    private readonly getCantonByIdUseCase: GetCantonByIdUseCase,
    private readonly getDistritosByCantonUseCase: GetDistritosByCantonUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
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
    status: HttpStatus.OK,
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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un cantón por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del cantón' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cantón encontrado' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cantón no encontrado',
  })
  async findById(@Param('id') id: string) {
    const canton = await this.getCantonByIdUseCase.execute(Number(id));
    if (!canton) {
      throw new NotFoundException('Cantón no encontrado');
    }
    return canton;
  }

  @Get(':id/distritos')
  @HttpCode(HttpStatus.OK)
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
    status: HttpStatus.OK,
    description: 'Lista de distritos obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cantón no encontrado',
  })
  async findDistritosByCantonId(
    @Query('page') page = 1,
    @Query('limit') limit = 7,
    @Param('id') id: string,
  ) {
    const canton = await this.getCantonByIdUseCase.execute(Number(id));
    if (!canton) {
      throw new NotFoundException('Cantón no encontrado');
    }

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
