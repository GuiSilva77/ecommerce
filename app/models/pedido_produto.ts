import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Pedido from './pedido.js'
import Produto from './produto.js'

export default class PedidoProduto extends BaseModel {
  @column({ isPrimary: true })
  declare ped_prod_id: bigint

  @hasOne(() => Pedido)
  declare pedido: HasOne<typeof Pedido>

  @hasOne(() => Produto)
  declare prod_id: HasOne<typeof Produto>

  @column()
  declare quantidade: number

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
