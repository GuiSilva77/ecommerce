import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comerciantes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('comerciante_id').notNullable()
      table.string('razaoSocial').notNullable()
      table.string('logo_url').nullable()
      table.string('banner_url').nullable()
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

      table.integer('id_endereco').unsigned().references('id_endereco').inTable('enderecos').nullable().onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
