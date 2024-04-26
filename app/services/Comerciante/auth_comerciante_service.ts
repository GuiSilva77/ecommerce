import AlreadyExistsException from '#exceptions/already_exists_exception'

import { inject } from '@adonisjs/core'
import { ComecianteLucidRepository } from '../../repositories/lucid/comerciante.js'
import Comerciante from '#models/comerciante'

type createComerciante = {
  cnpj: string
  senha: string
}

@inject()
export default class AuthComercianteService {
  constructor(private ComecianteRepository: ComecianteLucidRepository) {}

  public async create(payload: createComerciante) {
    const { cnpj, senha } = payload

    const comerciante = await Comerciante.verifyCredentials(cnpj, senha)
    const token = await Comerciante.accessTokens.create(comerciante)

    return token
  }

//   public async delete(){
//     const token = await Comerciante.accessTokens.delete()
//   }
}
