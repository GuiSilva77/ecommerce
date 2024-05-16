import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { Has, HasOne } from '@adonisjs/lucid/types/relations'
import Produto from './produto.js'
import Comerciante from './comerciante.js'
import Venda from './venda.js'

export default class SaidaEstoque extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare quantidade: number

  @column()
  declare data_lancamento: DateTime

  @hasOne(() => Produto)
  declare produto: HasOne<typeof Produto>

  @hasOne(() => Comerciante)
  declare comerciante: HasOne<typeof Comerciante>

  @hasOne(() => Venda)
  declare venda: HasOne<typeof Venda> | null

  @column()
  declare motivo: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
