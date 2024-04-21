import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'telefones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_telefone').notNullable()
      table.string('numero').notNullable()
      table.enum('tipo', ['CELULAR', 'FIXO']).notNullable()
      table
        .integer('usuario_id_usuario')
        .unsigned()
        .references('id_usuario')
        .inTable('usuario')
        .notNullable()
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
