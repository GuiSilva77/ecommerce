import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_venda').notNullable()
      table.float('total').notNullable()
      table.dateTime('data_venda').notNullable()
      table.float('descontos').notNullable()
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()

      table.integer('id_transacao').unsigned().references('id_transacao').inTable('transacaos').notNullable().onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('id_pedido').unsigned().references('id_pedido').inTable('pedidos').notNullable().onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
