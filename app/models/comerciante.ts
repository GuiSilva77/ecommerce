import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Endereco from './endereco.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Telefone from './telefone.js'
import Avaliacao from './avaliacao.js'
import Produto from './produto.js'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'

const Authfinder = withAuthFinder(() => hash.use("scrypt"), {passwordColumnName: "senha", uids: ["cnpj"]})
export default class Comerciante extends compose(BaseModel, Authfinder) {
  @column({ isPrimary: true })
  declare id_comerciante: number

  @column({columnName: "razaoSocial"})
  declare razaoSocial: string

  @column({columnName: "nomeFantasia"})
  declare nomeFantasia: string

  @column()
  declare logo_url: string

  @column()
  declare banner_url: string

  @column({serializeAs: null})
  declare cnpj: string

  @column()
  declare ativo: boolean

  @column()
  declare validado: boolean

  @column()
  declare email: string

  @column({serializeAs: null})
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

  static accessTokens = DbAccessTokensProvider.forModel(Comerciante, {table: "comerciante_auth_access_tokens"})
}
