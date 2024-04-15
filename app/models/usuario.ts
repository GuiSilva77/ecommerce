import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Endereco from './endereco.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Telefone from './telefone.js'
import { DateTime } from 'luxon'
import Avaliacao from './avaliacao.js'

export default class Usuario extends BaseModel {
  static table = "usuario"
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

  @hasMany(() => Endereco)
  declare enderecos: HasMany<typeof Endereco>

  @hasMany(() => Telefone)
  declare telefones: HasMany<typeof Telefone>

  @hasMany(() => Avaliacao)
  declare avaliacoes: HasMany<typeof Avaliacao>
}
