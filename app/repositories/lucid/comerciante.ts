import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import Comerciante from '#models/comerciante'
import { updateComerciante } from '#services/Comerciante/main_comerciante_service'
import { IComerciante } from '../IComerciante.js'

export class ComecianteLucidRepository implements IComerciante {
  async create(payload: { cnpj: string; email: string; senha: string }): Promise<Comerciante> {
    const comerciante = await Comerciante.create(payload)

    return comerciante
  }
  async findByCNPJ(cnpj: string) {
    const result = await Comerciante.findBy('cnpj', cnpj)

    return result
  }
  async findById(id: number): Promise<Comerciante | null> {
    const result = await Comerciante.findBy('id_comerciante', id)

    return result
  }
  async update(payload: updateComerciante, id: number): Promise<Comerciante> {
    const updating = await Comerciante.query().where('id_comerciante', id).update(payload)
    const comerciante = await this.findById(id)

    return comerciante!
  }
  async delete(id: number): Promise<void> {
    const comerciante = await this.findById(id)

    if (comerciante == null) {
      throw new ResourceNotFoundException('Comerciante não encontrado ou inexistente')
    }

    await comerciante.delete()
  }

  async updateImage(payload: { tipoImagem: 'LOGO' | 'BANNER'; path: string; id: number }): Promise<void> {
      if(payload.tipoImagem === 'LOGO'){
        const logoPayload = {logo_url: payload.path}
        const comerciante = Comerciante.query().where('id_comerciante', payload.id).update(logoPayload)
        return
      }
      const bannerPayload = {banner_url: payload.path}
      const comerciante = Comerciante.query().where('id_comerciante', payload.id).update(bannerPayload)
      return     
  }
}
