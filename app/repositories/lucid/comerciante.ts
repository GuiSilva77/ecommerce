import Comerciante from '#models/comerciante'
import { IComerciante } from '../IComerciante.js'

export class ComecianteLucidRepository implements IComerciante {
  async create(payload: { cnpj: string; email: string; senha: string }): Promise<Comerciante> {
    const comerciante = await Comerciante.create({ razao_social: 'teste', ...payload })

    return comerciante
  }
  async findByCNPJ(cnpj: string) {
    const result = await Comerciante.findBy('cnpj', cnpj)

    return result
  }
}
