import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'entrada_estoques'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.float('quantidade').notNullable()
      table.dateTime('data_lancto').notNullable()
      table.dateTime('validade').notNullable()
      table.string('lote').notNullable()
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
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
