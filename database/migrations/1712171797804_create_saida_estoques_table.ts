import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'saida_estoques'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_saida_estoque').notNullable()
      table.float('quantidade').notNullable()
      table.dateTime('data_lancto').notNullable()
      table.string('motivo').nullable()
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
