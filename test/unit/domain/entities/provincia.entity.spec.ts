import { Provincia } from '@/domain/entities';

describe('Provincia Entity', () => {
  it('should create a provincia instance', () => {
    const provincia = Provincia.create(1, 'San José');

    expect(provincia).toBeInstanceOf(Provincia);
    expect(provincia.idProvincia).toBe(1);
    expect(provincia.descripcion).toBe('San José');
  });
});
