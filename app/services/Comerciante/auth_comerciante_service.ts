import AlreadyExistsException from '#exceptions/already_exists_exception'

import { inject } from '@adonisjs/core'
import { ComecianteLucidRepository } from '../../repositories/lucid/comerciante.js'
import Comerciante from '#models/comerciante'
import { AccessToken } from '@adonisjs/auth/access_tokens'

type createComerciante = {
  cnpj: string
  senha: string
}

type deletarAuthToken = Comerciante & {
    currentAccessToken: AccessToken;
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

  public async delete(payload: deletarAuthToken){
    await Comerciante.accessTokens.delete(payload, payload.currentAccessToken.identifier)
  }

//   public async delete(){
//     const token = await Comerciante.accessTokens.delete()
//   }
}
