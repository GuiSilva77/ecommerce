import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Comerciante from './comerciante.js'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare rua: string

  @column()
  declare numero: string

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

  @hasOne(() => Comerciante)
  declare comerciante: HasOne<typeof Comerciante>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
