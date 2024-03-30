import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'avaliacaos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_avaliacao').notNullable()
      table.float('avaliacao').notNullable()
      table.string('conteudo').nullable()
      table.datetime('data_mod').notNullable()
      table.dateTime('data_criacao').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
