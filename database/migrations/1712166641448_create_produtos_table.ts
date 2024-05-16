import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produtos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('nome').notNullable()
      table.float('valor_venda').notNullable()
      table.float('valor_custo').notNullable()
      table.string('descricao').notNullable()
      table.string('img_url').notNullable()
      table.enum('unidade', ['UN', 'KG', 'L', 'M', 'CM', 'MM']).notNullable()
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()

      table
        .integer('id_comerciante')
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
