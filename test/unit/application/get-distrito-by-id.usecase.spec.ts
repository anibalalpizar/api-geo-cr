import { GetDistritoByIdUseCase } from '@/application/get-distrito-by-id.usecase';
import { Distrito } from '@/domain/entities/distrito.entity';
import { DistritoRepository } from '@/domain/repositories';

describe('GetDistritoByIdUseCase', () => {
  let useCase: GetDistritoByIdUseCase;
  let mockDistritoRepository: jest.Mocked<DistritoRepository>;

  beforeEach(() => {
    mockDistritoRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCantonId: jest.fn(),
    };

    useCase = new GetDistritoByIdUseCase(mockDistritoRepository);
  });

  it('should return distrito when it exists', async () => {
    const mockDistrito = Distrito.create(10101, 101, 'Carmen');
    mockDistritoRepository.findById.mockResolvedValue(mockDistrito);

    const result = await useCase.execute(10101);

    expect(result).toBeDefined();
    expect(result?.idDistrito).toBe(10101);
    expect(result?.idCanton).toBe(101);
    expect(result?.descripcion).toBe('Carmen');
    expect(mockDistritoRepository.findById).toHaveBeenCalledWith(10101);
  });

  it('should return null when distrito does not exist', async () => {
    mockDistritoRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(99999);

    expect(result).toBeNull();
    expect(mockDistritoRepository.findById).toHaveBeenCalledWith(99999);
  });
});
