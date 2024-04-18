import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cartaos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_cartao').notNullable()
      table.string('numero').notNullable()
      table.dateTime('validade').notNullable()
      table.string('cvv').notNullable()
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
