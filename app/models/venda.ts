import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Transacao from './transacao.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Pedido from './pedido.js'
import Comerciante from './comerciante.js'
import SaidaEstoque from './saida_estoque.js'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  declare total: number

  declare data_venda: DateTime

  declare descontos: number

  @column()
  declare transacaoId: bigint

  @column()
  declare pedidoId: bigint

  @column()
  declare comercianteId: bigint

  @column()
  declare saidaEstoqueId: bigint | null

  @hasOne(() => Transacao)
  declare transacao: HasOne<typeof Transacao>

  @hasOne(() => Pedido)
  declare pedido: HasOne<typeof Pedido>

  @hasOne(() => Comerciante)
  declare comerciante: HasOne<typeof Comerciante>

  @hasOne(() => SaidaEstoque)
  declare saida_estoques: HasOne<typeof SaidaEstoque>

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
