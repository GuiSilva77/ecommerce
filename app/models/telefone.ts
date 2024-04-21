import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Usuario from './usuario.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  declare tel_id: bigint

  @column()
  declare numero: string

  @column()
  declare tipo: 'CELULAR' | 'FIXO'

  @column({ columnName: 'usuario_id_usuario' })
  declare usuarioIdUsuario: bigint

  @hasOne(() => Usuario, {
    foreignKey: 'usuarioIdUsuario',
  })
  declare usuario: HasOne<typeof Usuario>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
