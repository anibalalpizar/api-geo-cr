export class Provincia {
  constructor(
    public readonly idProvincia: number,
    public readonly descripcion: string,
  ) {}

  static create(idProvincia: number, descripcion: string): Provincia {
    return new Provincia(idProvincia, descripcion);
  }
}
