import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'saida_estoques'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.float('quantidade').notNullable()
      table.dateTime('data_lancamento').notNullable()
      table.string('motivo').nullable()
      table.dateTime('data_criacao').notNullable()
      table.string('lote').notNullable()
      table.dateTime('data_mod').notNullable()

      table
        .integer('produto_id')
        .unsigned()
        .references('id')
        .inTable('produtos')
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
      table
        .integer('venda_id')
        .unsigned()
        .references('id')
        .inTable('vendas')
        .nullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
