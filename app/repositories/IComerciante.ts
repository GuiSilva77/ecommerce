import Comerciante from '#models/comerciante'

type createComerciante = {
  cnpj: string
  email: string
  senha: string
}

export interface IComerciante {
  findByCNPJ(cnpj: string): Promise<Comerciante | null>

  create(payload: createComerciante): Promise<Comerciante>
}
