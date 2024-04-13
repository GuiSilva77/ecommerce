import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'avaliacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('avaliacao_id').notNullable()
      table.float('avaliacao').notNullable()
      table.string('conteudo').nullable()
      table.datetime('data_mod').notNullable()
      table.dateTime('data_criacao').notNullable()
      table.integer('id_comerciante').unsigned().references('comerciantes.id_comerciante').onDelete('CASCADE')
      table.integer('id_usuario').unsigned().references('usuario.id_usuario').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
