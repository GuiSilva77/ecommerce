import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Produto from './produto.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  declare cat_id: bigint

  @column()
  declare nome: string

  @hasMany(() => Produto)
  declare produto_categoria: HasMany<typeof Produto>

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
