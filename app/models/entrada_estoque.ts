import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Comerciante from './comerciante.js'

export default class EntradaEstoque extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare quantidade: number

  @column.dateTime()
  declare data_lancamento: DateTime

  @column({ columnName: 'produto_id' })
  declare produtoId: number

  @column({ columnName: 'comerciante_id' })
  declare comercianteIdComerciante: number

  @belongsTo(() => Comerciante)
  declare comerciante: BelongsTo<typeof Comerciante>

  @column.dateTime()
  declare validade: DateTime

  @column()
  declare lote: string

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
