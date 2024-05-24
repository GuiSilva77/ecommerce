import Comerciante from '#models/comerciante'
import { updateComerciante } from '#services/Comerciante/main_comerciante_service'

type createComerciante = {
  cnpj: string
  email: string
  senha: string
}

type imageComerciante = {
  tipoImagem: 'LOGO' | 'BANNER';
  path: string
  id: number
}

export interface IComerciante {
  findByCNPJ(cnpj: string): Promise<Comerciante | null>

  create(payload: createComerciante): Promise<Comerciante>

  findById(id: number): Promise<Comerciante | null>

  update(payload: updateComerciante, id: number): Promise<Comerciante>

  delete(id: number): Promise<void>

  updateImage(payload: imageComerciante): Promise<void>
}
