import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'telefones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('numero').notNullable()
      table.enum('tipo', ['CELULAR', 'FIXO']).notNullable()
      table
        .integer('usuario_id')
        .unsigned()
        .references('usuario.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.dateTime('data_mod').notNullable
      table.datetime('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
