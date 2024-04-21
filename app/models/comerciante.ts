import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Endereco from './endereco.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Telefone from './telefone.js'
import Avaliacao from './avaliacao.js'
import Produto from './produto.js'

export default class Comerciante extends BaseModel {
  @column({ isPrimary: true })
  declare com_id: bigint

  @column({ columnName: 'razaoSocial' })
  declare razao_social: string

  @column()
  declare logo_url: string

  @column()
  declare banner_url: string

  @column()
  declare cnpj: string

  @column()
  declare ativo: boolean

  @column()
  declare validado: boolean

  @column()
  declare email: string

  @column()
  declare senha: string

  @column()
  declare valor_min_entrega: number

  @column()
  declare tipo: 'SUPERMERCADO' | 'HORTIFRUTI' | 'AÇOUGUE' | 'PADARIA' | 'SORVETERIA'

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_criacao: DateTime

  @hasOne(() => Endereco)
  declare enderecos: HasOne<typeof Endereco>

  @hasMany(() => Telefone)
  declare telefones: HasMany<typeof Telefone>

  @hasMany(() => Produto)
  declare produtos: HasMany<typeof Produto>

  @hasMany(() => Avaliacao)
  declare avaliacoes: HasMany<typeof Avaliacao>
}
