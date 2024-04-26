import AlreadyExistsException from '#exceptions/already_exists_exception'

import { inject } from '@adonisjs/core'
import { ComecianteLucidRepository } from '../../repositories/lucid/comerciante.js'
import NotFoundException from '#exceptions/not_found_exception'

type createComerciante = {
  cnpj: string
  email: string
  senha: string
}

type tipoComerciante = 
  'SUPERMERCADO'| 'HORTIFRUTI'| 'AÇOUGUE' | 'PADARIA' | 'SORVETERIA'


type tipoEndereco =
  'RESIDENCIAL' | 'COMERCIAL' | 'CASA' | 'TRABALHO'


type tipoTelefone = 
  'CELULAR' | 'FIXO'


type endereco = {
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  tipo: tipoEndereco
}

type telefone = {
  numero: string
  tipo: tipoTelefone
}

export type updateComerciante = {
  ativo: boolean | undefined
  email: string | undefined
  valor_min_entrega: number | undefined
  tipo: tipoComerciante | undefined  
  endereco: endereco | undefined
  telefone: telefone[] | undefined
}

@inject()
export default class MainComercianteService {
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

  public async search(id: number){
    const comerciante = await this.ComecianteRepository.findById(id)

    if (comerciante == null){
      throw new NotFoundException("Comerciante não encontrado ou inexistente")
    }

    return comerciante
  }

  public async update(payload: updateComerciante, id: number){
    const comerciante = await this.ComecianteRepository.update(payload, id)

    return comerciante
  }
}
