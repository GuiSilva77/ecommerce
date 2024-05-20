import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Pedido from './pedido.js'
import Produto from './produto.js'

export default class PedidoProduto extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare pedidoId: number

  @column()
  declare produtoId: number

  @hasOne(() => Pedido)
  declare pedido: HasOne<typeof Pedido>

  @hasOne(() => Produto)
  declare produto: HasOne<typeof Produto>

  @column()
  declare quantidade: number

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
