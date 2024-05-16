import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import Categoria from './categoria.js'
import type { BelongsTo, HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Comerciante from './comerciante.js'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare nome: string

  @column()
  declare valor_venda: number

  @column()
  declare valor_custo: number

  @column()
  declare descricao: string

  @column()
  declare img_url: string

  @column()
  declare unidade: 'UN' | 'KG' | 'L' | 'M' | 'CM' | 'MM'

  @column({ columnName: 'id_comerciante' })
  declare id_comerciante: bigint

  @belongsTo(() => Comerciante, {
    foreignKey: 'id_comerciante',
  })
  declare comerciante: BelongsTo<typeof Comerciante>

  @manyToMany(() => Categoria, {
    pivotTable: 'produto_categorias',
    pivotForeignKey: 'produto_id',
    pivotRelatedForeignKey: 'categoria_id',
  })
  declare categorias: ManyToMany<typeof Categoria>

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
