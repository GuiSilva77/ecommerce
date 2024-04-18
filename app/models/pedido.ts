import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Usuario from './usuario.js'
import type { Has, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'
import PedidoProduto from './pedido_produto.js'

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  declare ped_id: bigint

  @column()
  declare subtotal: number

  @column()
  declare data_pedido: DateTime

  @column()
  declare data_recebimento: DateTime

  @column()
  declare obs: string

  @hasOne(() => Usuario)
  declare usuario: HasOne<typeof Usuario>

  @hasOne(() => Endereco)
  declare endereco_entrega: HasOne<typeof Endereco>

  @hasMany(() => PedidoProduto)
  declare produto: HasMany<typeof PedidoProduto>

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
