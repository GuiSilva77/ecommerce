import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Avaliacao extends BaseModel {
  @column({ isPrimary: true })
  declare ava_id: bigint

  @column()
  declare rate: number

  @column()
  declare conteudo: string

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
