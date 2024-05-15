import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Telefone from './telefone.js'
import { DateTime } from 'luxon'
import Avaliacao from './avaliacao.js'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'senha',
})

export default class Usuario extends compose(BaseModel, AuthFinder) {
  static table = 'usuario'
  @column({ isPrimary: true })
  declare id_usuario: bigint

  @column()
  declare nome: string

  @column()
  declare email: string

  @column()
  declare img_url: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_criacao: DateTime

  @column()
  declare ativo: boolean

  @column()
  declare validado: boolean

  @column()
  declare senha: string

  @hasMany(() => Telefone)
  declare telefones: HasMany<typeof Telefone>

  @hasMany(() => Avaliacao)
  declare avaliacoes: HasMany<typeof Avaliacao>

  static accessTokens = DbAccessTokensProvider.forModel(Usuario, {
    expiresIn: '30 days',
  })
}
