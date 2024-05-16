import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Usuario from './usuario.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PedidoProduto from './pedido_produto.js'

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare subtotal: number

  @column.dateTime()
  declare data_pedido: DateTime

  @column.dateTime()
  declare data_recebimento: DateTime

  @column()
  declare obs: string

  @column()
  declare usuarioId: bigint

  @belongsTo(() => Usuario)
  declare usuario: BelongsTo<typeof Usuario>

  @hasMany(() => PedidoProduto)
  declare produto: HasMany<typeof PedidoProduto>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
