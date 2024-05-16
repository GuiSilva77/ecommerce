import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Transacao from './transacao.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Pedido from './pedido.js'
import Comerciante from './comerciante.js'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  declare total: number

  declare data_venda: DateTime

  declare descontos: number

  @hasOne(() => Transacao)
  declare transacao: HasOne<typeof Transacao>

  @hasOne(() => Pedido)
  declare pedido: HasOne<typeof Pedido>

  @hasOne(() => Comerciante)
  declare comerciante: HasOne<typeof Comerciante>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
