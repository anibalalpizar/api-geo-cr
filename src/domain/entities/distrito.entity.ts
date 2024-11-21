export class Distrito {
  constructor(
    public readonly idDistrito: number,
    public readonly idCanton: number,
    public readonly descripcion: string,
  ) {}

  static create(
    idDistrito: number,
    idCanton: number,
    descripcion: string,
  ): Distrito {
    return new Distrito(idDistrito, idCanton, descripcion);
  }
}
