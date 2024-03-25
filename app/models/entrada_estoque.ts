import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Produto from './produto.js'
import Comerciante from './comerciante.js'

export default class EntradaEstoque extends BaseModel {
  @column({ isPrimary: true })
  declare ent_est_id: bigint

  @column()
  declare quantidade: number

  @column()
  declare data_lancamento: DateTime

  @hasOne(() => Produto)
  declare produto: HasOne<typeof Produto>

  @hasOne(() => Comerciante)
  declare comerciante: HasOne<typeof Comerciante>

  @column()
  declare validade: DateTime

  @column()
  declare lote: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
