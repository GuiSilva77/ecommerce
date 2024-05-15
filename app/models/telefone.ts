import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'

export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare numero: string

  @column()
  declare tipo: 'CELULAR' | 'FIXO'

  @column()
  declare usuarioId: bigint

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
