import { GetAllCantonesUseCase } from '@/application/get-all-cantones.usecase';
import { GetDistritosByCantonUseCase } from '@/application/get-distritos-by-canton.usecase';
import { Canton } from '@/domain/entities';
import { CantonController } from '@/interfaces/canton.controller';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';

describe('CantonController', () => {
  let controller: CantonController;
  let mockGetAllCantonesUseCase: jest.Mocked<GetAllCantonesUseCase>;
  let mockGetDistritosByCantonUseCase: jest.Mocked<GetDistritosByCantonUseCase>;

  const mockPaginatedResponse = {
    status: ResponseStatus.SUCCESS,
    message: ResponseMessages.CANTONES_FETCHED_SUCCESSFULLY,
    data: [Canton.create(101, 1, 'San José')],
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
    mockGetAllCantonesUseCase = {
      execute: jest.fn().mockResolvedValue(mockPaginatedResponse),
    } as any;

    mockGetDistritosByCantonUseCase = {
      execute: jest.fn(),
    } as any;

    controller = new CantonController(
      mockGetAllCantonesUseCase,
      mockGetDistritosByCantonUseCase,
    );
  });

  describe('findAll', () => {
    it('should return paginated cantones', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(mockPaginatedResponse);
      expect(mockGetAllCantonesUseCase.execute).toHaveBeenCalledWith({
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
      mockGetAllCantonesUseCase.execute.mockResolvedValueOnce(
        customPaginatedResponse,
      );

      const result = await controller.findAll(2, 5);

      expect(result).toEqual(customPaginatedResponse);
      expect(mockGetAllCantonesUseCase.execute).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
      });
    });
  });

  describe('findDistritosByCantonId', () => {
    it('should return distritos for a canton', async () => {
      const mockResponse = {
        status: ResponseStatus.SUCCESS,
        message: ResponseMessages.DISTRITOS_BY_CANTON_FETCHED_SUCCESSFULLY,
        data: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 7,
          totalPages: 0,
          currentPage: 1,
          timestamp: expect.any(String),
        },
      };

      mockGetDistritosByCantonUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.findDistritosByCantonId(1, 7, '101');

      expect(result).toEqual(mockResponse);
      expect(mockGetDistritosByCantonUseCase.execute).toHaveBeenCalledWith(
        { page: 1, limit: 7 },
        101,
      );
    });
  });
});
