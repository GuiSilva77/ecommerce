import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  declare tel_id: bigint

  @column()
  declare numero: string

  @column()
  declare tipo: 'CELULAR' | 'FIXO'

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
