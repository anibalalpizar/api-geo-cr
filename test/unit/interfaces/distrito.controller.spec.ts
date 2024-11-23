import { GetAllDistritosUseCase } from '@/application/get-all-distritos.usecase';
import { GetDistritoByIdUseCase } from '@/application/get-distrito-by-id.usecase';
import { ResponseMessages, ResponseStatus } from '@/constants';
import { Distrito } from '@/domain/entities/distrito.entity';
import { DistritoController } from '@/interfaces/distrito.controller';

describe('DistritoController', () => {
  let controller: DistritoController;
  let mockGetAllDistritosUseCase: jest.Mocked<GetAllDistritosUseCase>;
  let mockGetDistritoByIdUseCase: jest.Mocked<GetDistritoByIdUseCase>;

  const mockPaginatedResponse = {
    status: ResponseStatus.SUCCESS,
    statusCode: 200,
    message: ResponseMessages.DISTRITOS_FETCHED_SUCCESSFULLY,
    data: [Distrito.create(10101, 101, 'Carmen')],
    meta: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 7,
      totalPages: 1,
      currentPage: 1,
      timestamp: expect.any(String),
    },
  };

  beforeEach(() => {
    mockGetAllDistritosUseCase = {
      execute: jest.fn().mockResolvedValue(mockPaginatedResponse),
    } as any;

    mockGetDistritoByIdUseCase = {
      execute: jest.fn(),
    } as any;

    controller = new DistritoController(
      mockGetAllDistritosUseCase,
      mockGetDistritoByIdUseCase,
    );
  });

  describe('findAll', () => {
    it('should return paginated distritos', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(mockPaginatedResponse);
      expect(mockGetAllDistritosUseCase.execute).toHaveBeenCalledWith({
        page: 1,
        limit: 7,
      });
    });

    it('should handle custom pagination parameters', async () => {
      const customPaginatedResponse = {
        ...mockPaginatedResponse,
        meta: {
          ...mockPaginatedResponse.meta,
          itemsPerPage: 5,
          currentPage: 2,
        },
      };
      mockGetAllDistritosUseCase.execute.mockResolvedValueOnce(
        customPaginatedResponse,
      );

      const result = await controller.findAll(2, 5);

      expect(result).toEqual(customPaginatedResponse);
      expect(mockGetAllDistritosUseCase.execute).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
      });
    });
  });

  describe('findById', () => {
    it('should return a distrito when it exists', async () => {
      const mockDistrito = Distrito.create(10101, 101, 'Carmen');
      mockGetDistritoByIdUseCase.execute.mockResolvedValue(mockDistrito);

      const result = await controller.findById('10101');

      expect(result).toEqual(mockDistrito);
      expect(mockGetDistritoByIdUseCase.execute).toHaveBeenCalledWith(10101);
    });
  });
});
