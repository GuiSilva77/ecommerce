import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Produto from './produto.js'
import Comerciante from './comerciante.js'
import Venda from './venda.js'

export default class SaidaEstoque extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare quantidade: number

  @column.dateTime()
  declare data_lancamento: DateTime

  @column()
  declare lote: string

  @column()
  declare produtoId: number

  @column({
    columnName: 'comerciante_id',
  })
  declare comercianteIdComerciante: bigint

  @column()
  declare vendaId: number | null

  @hasOne(() => Produto)
  declare produto: HasOne<typeof Produto>

  @belongsTo(() => Comerciante)
  declare comerciante: BelongsTo<typeof Comerciante>

  @hasOne(() => Venda)
  declare venda: HasOne<typeof Venda> | null

  @column()
  declare motivo: string | null

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
