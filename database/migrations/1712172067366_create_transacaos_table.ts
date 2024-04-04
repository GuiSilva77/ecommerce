import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transacaos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_transacao').notNullable()
      table.float('valor').notNullable()
      table.enum('tipo', ['CARTÃO', 'PIX', 'DINHEIRO']).notNullable()
      table.enum('status', ['PROCESSANDO', 'APROVADO', 'REPROVADO']).notNullable()
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
