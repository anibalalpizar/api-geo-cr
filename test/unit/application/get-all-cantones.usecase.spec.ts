import { GetAllCantonesUseCase } from '@/application/get-all-cantones.usecase';
import { Canton } from '@/domain/entities';
import { CantonRepository } from '@/domain/repositories';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';

describe('GetAllCantonesUseCase', () => {
  let useCase: GetAllCantonesUseCase;
  let mockCantonRepository: jest.Mocked<CantonRepository>;

  const mockCantones = [
    Canton.create(101, 1, 'San José'),
    Canton.create(102, 1, 'Escazú'),
    Canton.create(103, 1, 'Desamparados'),
  ];

  beforeEach(() => {
    mockCantonRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByProvinciaId: jest.fn(),
    };

    useCase = new GetAllCantonesUseCase(mockCantonRepository);
  });

  it('should return paginated cantones', async () => {
    mockCantonRepository.findAll.mockResolvedValue(mockCantones);

    const result = await useCase.execute({ page: 1, limit: 2 });

    expect(result.status).toBe(ResponseStatus.SUCCESS);
    expect(result.statusCode).toBe(200);
    expect(result.message).toBe(ResponseMessages.CANTONES_FETCHED_SUCCESSFULLY);
    expect(result.data).toHaveLength(2);
    expect(result.meta).toEqual({
      totalItems: 3,
      itemCount: 2,
      itemsPerPage: 2,
      totalPages: 2,
      currentPage: 1,
      timestamp: expect.any(String),
    });
  });

  it('should handle empty page', async () => {
    mockCantonRepository.findAll.mockResolvedValue(mockCantones);

    const result = await useCase.execute({ page: 3, limit: 2 });

    expect(result.status).toBe(ResponseStatus.SUCCESS);
    expect(result.statusCode).toBe(200);
    expect(result.data).toHaveLength(0);
    expect(result.meta.currentPage).toBe(3);
    expect(result.meta.totalPages).toBe(2);
  });
});
