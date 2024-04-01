import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Transacao extends BaseModel {
  @column({ isPrimary: true })
  declare trans_id: bigint

  @column()
  declare valor: number

  @column()
  declare tipo: 'CARTÃO' | 'PIX' | 'DINHEIRO'

  @column()
  declare status: 'PROCESSANDO' | 'APROVADO' | 'REPROVADO'

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}