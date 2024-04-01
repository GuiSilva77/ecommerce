import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Endereco from './endereco.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Telefone from './telefone.js'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  declare user_id: bigint

  @column()
  declare nome: string

  @column()
  declare img_url: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime

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
}