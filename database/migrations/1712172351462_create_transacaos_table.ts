import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transacaos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.float('valor').notNullable()
      table.enum('tipo', ['CARTÃO', 'PIX', 'DINHEIRO']).notNullable()
      table.enum('status', ['PROCESSANDO', 'APROVADO', 'REPROVADO']).notNullable()
      table
        .integer('venda_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('vendas')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()
    })
    this.schema.alterTable('vendas', (table) => {
      table
        .integer('transacao_id')
        .unsigned()
        .references('id')
        .inTable('transacaos')
        .nullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
