import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comerciantes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_comerciante').notNullable()
      table.string('razaoSocial').notNullable()
      table.string('img_url').nullable()
      table.string('cnpj').notNullable()
      table.boolean('ativo').notNullable().defaultTo(true)
      table.boolean('validado').notNullable().defaultTo(false)
      table.string('email').notNullable()
      table.string('senha').notNullable()
      table.float('valor_min_entrega').nullable()
      table
        .enum('tipo', ['SUPERMERCADO', 'HORTIFRUTI', 'AÇOUGUE', 'PADARIA', 'SORVETERIA'])
        .notNullable()
      table.dateTime('data_criacao').notNullable()
      table.dateTime('data_mod').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
