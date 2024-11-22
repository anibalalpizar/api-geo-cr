import { InMemoryCantonRepository } from '@/infrastructure/persistence/canton.in-memory.repository';
import { cantonesData } from '@/infrastructure/persistence/data/canton.data';

describe('InMemoryCantonRepository', () => {
  let repository: InMemoryCantonRepository;

  beforeEach(() => {
    repository = new InMemoryCantonRepository();
  });

  describe('findAll', () => {
    it('should return all cantones', async () => {
      const cantones = await repository.findAll();

      expect(cantones).toHaveLength(cantonesData.length);
      expect(cantones).toEqual(cantonesData);
    });
  });

  describe('findById', () => {
    it('should return a canton when it exists', async () => {
      const canton = await repository.findById(101);

      expect(canton).toBeDefined();
      expect(canton?.idCanton).toBe(101);
      expect(canton?.idProvincia).toBe(1);
      expect(canton?.descripcion).toBe('San José');
    });

    it('should return null when canton does not exist', async () => {
      const canton = await repository.findById(999);

      expect(canton).toBeNull();
    });
  });

  describe('findByProvinciaId', () => {
    it('should return cantones for a specific provincia', async () => {
      const cantones = await repository.findByProvinciaId(1);

      expect(cantones.length).toBeGreaterThan(0);
      expect(cantones.every((canton) => canton.idProvincia === 1)).toBe(true);
    });

    it('should return empty array when provincia has no cantones', async () => {
      const cantones = await repository.findByProvinciaId(999);

      expect(cantones).toHaveLength(0);
    });
  });
});
