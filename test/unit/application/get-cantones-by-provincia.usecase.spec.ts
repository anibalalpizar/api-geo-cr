import { GetCantonesByProvinciaUseCase } from '@/application/get-cantones-by-provincia.usecase';
import { Canton } from '@/domain/entities';
import { CantonRepository } from '@/domain/repositories';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';

describe('GetCantonesByProvinciaUseCase', () => {
  let useCase: GetCantonesByProvinciaUseCase;
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

    useCase = new GetCantonesByProvinciaUseCase(mockCantonRepository);
  });

  it('should return paginated cantones for a provincia', async () => {
    mockCantonRepository.findByProvinciaId.mockResolvedValue(mockCantones);

    const result = await useCase.execute({ page: 1, limit: 2 }, 1);

    expect(result.status).toBe(ResponseStatus.SUCCESS);
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
    expect(mockCantonRepository.findByProvinciaId).toHaveBeenCalledWith(1);
  });

  it('should handle empty result for non-existent provincia', async () => {
    mockCantonRepository.findByProvinciaId.mockResolvedValue([]);

    const result = await useCase.execute({ page: 1, limit: 10 }, 999);

    expect(result.status).toBe(ResponseStatus.SUCCESS);
    expect(result.data).toHaveLength(0);
    expect(result.meta.totalItems).toBe(0);
    expect(mockCantonRepository.findByProvinciaId).toHaveBeenCalledWith(999);
  });
});
