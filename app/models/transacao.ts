import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Transacao extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare valor: number

  @column()
  declare tipo: 'CARTÃO' | 'PIX' | 'DINHEIRO'

  @column()
  declare status: 'PROCESSANDO' | 'APROVADO' | 'REPROVADO'

  @column({
    columnName: 'venda_id',
  })
  declare vendaId: number

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
