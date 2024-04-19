import AlreadyExistsException from '#exceptions/already_exists_exception'

import { inject } from '@adonisjs/core'
import { ComecianteLucidRepository } from '../repositories/lucid/comerciante.js'

type createComerciante = {
  cnpj: string
  email: string
  senha: string
}

@inject()
export default class ComercianteService {
  constructor(private ComecianteRepository: ComecianteLucidRepository) {}

  public async create(payload: createComerciante) {
    const { cnpj, email, senha } = payload
    const cnpjExists = await this.ComecianteRepository.findByCNPJ(cnpj)

    if (cnpjExists) {
      throw new AlreadyExistsException('Comerciante já cadastrado')
    }

    const comerciante = await this.ComecianteRepository.create({ cnpj, email, senha })
    return comerciante
  }
}
