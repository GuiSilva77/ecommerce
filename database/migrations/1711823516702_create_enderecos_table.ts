import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_endereco').notNullable()
      table.string('rua').notNullable()
      table.integer('numero').nullable()
      table.string('bairro').notNullable()
      table.string('cidade').notNullable()
      table.string('estado').notNullable()
      table.string('cep').notNullable()
      table.enum('tipo', ['RESIDENCIAL', 'COMERCIAL', 'CASA', 'TRABALHO']).notNullable()
      table.dateTime('data_mod').notNullable()
      table.datetime('data_criacao').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
