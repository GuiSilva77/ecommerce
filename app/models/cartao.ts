import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'

export default class Cartao extends BaseModel {
  @column({ isPrimary: true })
  declare car_id: bigint

  @column()
  declare numero: string

  @column()
  declare validade: Date

  @column()
  declare cvv: string

  @hasOne(() => Usuario)
  declare usuario: HasOne<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
