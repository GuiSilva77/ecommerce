import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedido_produtos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_ped_produto').notNullable()
      table.float('quantidade').notNullable()
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()
      table
        .integer('id_produto')
        .unsigned()
        .references('id')
        .inTable('produtos')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('id_pedido')
        .unsigned()
        .references('id_pedido')
        .inTable('pedidos')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
