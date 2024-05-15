import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Comerciante from './comerciante.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'

export default class Avaliacao extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare avaliacao: number

  @column()
  declare conteudo: string

  @hasOne(() => Comerciante)
  declare comerciante: HasOne<typeof Comerciante>

  @hasOne(() => Usuario)
  declare criador: HasOne<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
