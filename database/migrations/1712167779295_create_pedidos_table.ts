import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedidos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.float('subtotal').notNullable()
      table.dateTime('data_pedido').notNullable()
      table.dateTime('data_recebimento').nullable()
      table.string('obs').nullable()
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()
      table
        .integer('usuario_id')
        .unsigned()
        .references('id')
        .inTable('usuario')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
