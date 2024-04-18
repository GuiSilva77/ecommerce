import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Categoria from './categoria.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Comerciante from './comerciante.js'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  declare prod_id: bigint

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

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime

}
