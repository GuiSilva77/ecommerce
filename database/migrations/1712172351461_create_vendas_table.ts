import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.float('total').notNullable()
      table.dateTime('data_venda').notNullable()
      table.float('descontos').notNullable()
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()
      table
        .integer('pedido_id')
        .unsigned()
        .references('id')
        .inTable('pedidos')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('comerciante_id')
        .unsigned()
        .references('id_comerciante')
        .inTable('comerciantes')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
