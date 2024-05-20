import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import SaidaEstoque from './saida_estoque.js'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare total: number

  @column.dateTime()
  declare data_venda: DateTime

  @column()
  declare descontos: number

  @column({ columnName: 'transacao_id' })
  declare transacaoId: number

  @column({ columnName: 'pedido_id' })
  declare pedidoId: number

  @column({ columnName: 'comerciante_id' })
  declare comercianteId: number

  @column()
  declare saidaEstoqueId: number | null

  @hasOne(() => SaidaEstoque)
  declare saida_estoques: HasOne<typeof SaidaEstoque>

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
