import { provinciasData } from '@/infrastructure/persistence/data/provincia.data';
import { InMemoryProvinciaRepository } from '@/infrastructure/persistence/provincia.in-memory.repository';

describe('InMemoryProvinciaRepository', () => {
  let repository: InMemoryProvinciaRepository;

  beforeEach(() => {
    repository = new InMemoryProvinciaRepository();
  });

  describe('findAll', () => {
    it('should return all provincias', async () => {
      const provincias = await repository.findAll();

      expect(provincias).toHaveLength(provinciasData.length);
      expect(provincias).toEqual(provinciasData);
    });
  });

  describe('findById', () => {
    it('should return a provincia when it exists', async () => {
      const provincia = await repository.findById(1);

      expect(provincia).toBeDefined();
      expect(provincia?.idProvincia).toBe(1);
      expect(provincia?.descripcion).toBe('San José');
    });

    it('should return null when provincia does not exist', async () => {
      const provincia = await repository.findById(999);

      expect(provincia).toBeNull();
    });
  });
});
