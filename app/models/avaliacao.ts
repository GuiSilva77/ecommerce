import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Usuario from './usuario.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Avaliacao extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare avaliacao: number

  @column()
  declare conteudo: string

  @column({
    columnName: 'usuario_id',
  })
  declare usuarioId: number

  @belongsTo(() => Usuario)
  declare criador: BelongsTo<typeof Usuario>

  @column({
    columnName: 'comerciante_id',
  })
  declare comercianteId: number

  @column.dateTime({ autoCreate: true })
  declare data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_mod: DateTime
}
