import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { EnumDeclaration } from 'typescript'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  declare end_id: bigint

  @column()
  declare rua: string

  @column()
  declare numero: number

  @column()
  declare bairro: string

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare cep: string

  @column()
  declare tipo: 'RESIDENCIAL' | 'COMERCIAL' | 'CASA' | 'TRABALHO'

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
